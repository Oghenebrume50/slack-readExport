require('dotenv').config();
const { App } = require('@slack/bolt');
const dbHandler = require('./dbhandler');
const logger = require('./utils/logger');

const bot = new App({
  signingSecret: process.env.SigningSecret,
  token: process.env.Token
});

const port = 3000;
const { app } = bot.receiver;

app.set('view engine', 'ejs');

app.get('/file/:filename', function(req, res){
  const file = `${__dirname}/files/${req.params.filename}`;
  res.download(file);
});

app.get('/:readId', (req, res) => {
  dbHandler.getRead(req.params.readId)
  .then(data => {
    res.render('read', {contents: data[0].content});
  })
  .catch( err => logger.info("An error occurred with the read route "+err))
});

app.get('/', (req, res) => {
  res.render('index');
});

(async () => {
  await bot.start(process.env.PORT || port);
  logger.info("started on port "+ port);
})();

module.exports = bot;