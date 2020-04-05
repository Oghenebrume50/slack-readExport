const db = require('./db');
const getAllMessages = require('./utils/all_thread');

const dbHandler = {};

dbHandler.insertRead = ({event, response}) => {
  return db('reads')
    .then(function () {
      return db('reads')
      .returning('id')
      .insert({
        read_id: event.channel + event.thread_ts,
        content: [response.messages[0].text]
      })
    }).catch((err) => {
      console.log("did not save this "+err);
    });
}

dbHandler.insertAllText = ({event, response}) => {
  console.log(response.messages);
  
  return db('reads')
    .then(function () {
      return db('reads')
      .returning('id')
      .insert({
        read_id: event.channel + event.thread_ts,
        content: getAllMessages(response.messages)
      });
    }).catch((err) => {
      console.log("did not save this "+err);
    });
}

dbHandler.getRead = async (readId) => {
  return await db.select('content')
    .where('read_id', readId )
    .from('reads')
}

module.exports = dbHandler;