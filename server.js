require('dotenv').config();
const { App } = require('@slack/bolt');
const dbHandler = require('./dbhandler');

const bot = new App({
  signingSecret: process.env.SigningSecret,
  token: process.env.Token
});

const port = 3000;
const { app } = bot.receiver;

console.log(app);
app.get('/:readId', (req, res) => {
  dbHandler.getRead(req.params.readId)
  .then(d => {
    res.json(d[0].content);
    console.log(d[0]);
  })
  .catch( e => console.log(e))
});

(async () => {
  await bot.start(process.env.PORT || port);
  console.log('⚡️ Bolt app is running!');
})();

module.exports = bot;