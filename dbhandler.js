const db = require('./db');
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
  console.log('read');
}

dbHandler.getRead = (readId) => {
  return db.select('content')
    .where('read_id', readId )
    .from('reads')
}

module.exports = dbHandler;