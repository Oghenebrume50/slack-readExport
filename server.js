require('dotenv').config();
const { App } = require('@slack/bolt');
const dbHandler = require('./dbhandler');

const bot = new App({
  signingSecret: process.env.SigningSecret,
  token: process.env.Token
});

const port = 3000;
const { app } = bot.receiver;

console.log()
app.get('/:readId', (req, res) => {
  const readContent = dbHandler.getRead(req.params.readId).then(data =>res.json(data))
  readContent.then(d => {
    res.json(d);
    console.log(d);
  })
  .catch( e => console.log(e))
  //res.send("hey server runs too");
});

(async () => {
  await bot.start(process.env.PORT || port);
  console.log('⚡️ Bolt app is running!');
})();

module.exports = bot;