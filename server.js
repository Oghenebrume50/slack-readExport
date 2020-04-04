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
console.log('---------');

console.log(app.route);

app.get('/:readId', (req, res) => {
  dbHandler.getRead(req.params.readId)
  .then(d => {
    res.json(d[0].content);
    console.log(d[0]);
  })
  .catch( e => console.log(e))
});

app.route('/')
.get((req, res) =>  res.sendFile((__dirname+'/index.html')));

(async () => {
  await bot.start(process.env.PORT || port);
  console.log('⚡️ Bolt app is running!');
})();

module.exports = bot;