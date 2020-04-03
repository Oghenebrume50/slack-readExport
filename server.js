require('dotenv').config();
const { App } = require('@slack/bolt');

const bot = new App({
  signingSecret: process.env.SigningSecret,
  token: process.env.Token
});

const port = 3000;
const { app } = bot.receiver;

app.get('/rice', (req, res) => {
  res.send("hey server runs too");
});

(async () => {
  await bot.start(process.env.PORT || port);
  console.log('⚡️ Bolt app is running!');
})();

module.exports = bot;