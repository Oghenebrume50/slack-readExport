require('dotenv').config();
const { App } = require('@slack/bolt');
const dbHandler = require('./dbhandler');
const logger = require('./utils/logger');

const bot = new App({
  signingSecret: process.env.SigningSecret,
  token: process.env.Token
});

console.log(process.env.User);
const port = 3000;
const { app } = bot.receiver;

app.set('view engine', 'ejs');

app.get('/:readId', (req, res) => {
  dbHandler.getRead(req.params.readId)
  .then(data => {
    res.render('read', {contents: data[0].content});
  })
  .catch( err => logger.info("An error occurred with the read route "+err))
});

app.get('/', function(req, res){ 
  res.render('index');
});

(async () => {
  await bot.start(process.env.PORT || port);
  logger.info("started on port "+ port);
})();

module.exports = bot;