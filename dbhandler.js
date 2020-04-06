const db = require('./db');
const logger = require('./utils/logger');
const getMessages = require('./utils/get_thread');

const dbHandler = {};

dbHandler.insertFirstText = ({event, response}) => {
  return db('reads')
    .then(function () {
      return db('reads')
      .returning('id')
      .insert({
        read_id: event.channel + event.thread_ts + 'first',
        content: [response.messages[0].text]
      })
    }).catch((err) => {
      logger.info("did not insert first text to db "+err);
    });
}

dbHandler.insertAllText = ({event, response}) => { 
  return db('reads')
    .then(function () {
      return db('reads')
      .returning('id')
      .insert({
        read_id: event.channel + event.thread_ts,
        content: getMessages.getAllUserMessage(response.messages)
      });
    }).catch((err) => {
      logger.info("did not insert all to db "+err);
    });
}

dbHandler.getRead = async (readId) => {
  return await db.select('content')
    .where('read_id', readId )
    .from('reads')
}

module.exports = dbHandler;