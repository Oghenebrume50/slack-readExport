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
        content: getMessages.getAllUserMessage(response.messages, event)
      });
    }).catch((err) => {
      logger.info("did not insert all to db "+err);
    });
}

dbHandler.saveTeam = ({access_token, bot_user_id, id, name, bot_id}) => {
  return db('workspaces')
      .returning('id')
      .insert({
        team_name: name,
        team_id: id,
        bot_user_id: bot_user_id,
        token: access_token,
        bot_id: bot_id
      }).catch((err) => {
    logger.info("did not insert all to db, could not save team "+err);
  });
}

dbHandler.checkTeam = async () => {
  const teams = await db.select('team_id', 'bot_user_id', 'bot_id', 'token')
    .from('workspaces')

  return teams;
}

dbHandler.getRead = async (readId) => {
  return await db.select('content')
    .where('read_id', readId )
    .from('reads')
}

module.exports = dbHandler;