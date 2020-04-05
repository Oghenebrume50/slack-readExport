require('dotenv').config();
//const ejs = require('ejs');
const { App } = require('@slack/bolt');
const dbHandler = require('./dbhandler');

const bot = new App({
  signingSecret: process.env.SigningSecret,
  token: process.env.Token
});

const port = 3000;
const { app } = bot.receiver;

app.set('view engine', 'ejs');

app.get('/:readId', (req, res) => {
  dbHandler.getRead(req.params.readId)
  .then(data => {
    res.render('read', {contents: data[0].content});
  })
  .catch( e => console.log(e))
});

app.get('/', function(req, res){ 
  res.render('index');
});

(async () => {
  await bot.start(process.env.PORT || port);
  console.log('⚡️ Bolt app is running!');
})();

module.exports = bot;