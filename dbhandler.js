const db = require('./db');
const dbHandler = {};

dbHandler.insertRead = ({event, response}) => {
  return db('reads')
    .then(function () {
      // Inserts seed entries
      return db('reads')
      .returning('id')
      .insert({
        read_id: event.channel + event.thread_ts,
        content: [response.messages[0].text]
      })
    }).catch((err) => {
      console.log("did not save this "+err);
    });
  console.log('read');
}

module.exports = dbHandler;