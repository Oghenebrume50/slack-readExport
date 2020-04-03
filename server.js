const { App } = require('@slack/bolt');

const bot = new App({
  signingSecret: '053951c5d4aced4953eecb4d6b45ba0a',
  token: 'xoxb-569049821472-1040770229136-8Zr9H7cNJYDOEMgilzrrWyTk'
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