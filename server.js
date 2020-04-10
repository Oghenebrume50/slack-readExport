require('dotenv').config();
const { App, ExpressReceiver} = require('@slack/bolt');
const randomString = require('randomstring');
const dbHandler = require('./dbhandler');
const logger = require('./utils/logger');

const expressReceiver = new ExpressReceiver({
  signingSecret: process.env.SigningSecret,
  endpoints: '/slack/events'
});

const authorizeFn = async ({ teamId }) => {
  const teams = await dbHandler.checkTeam();
  for (const team of teams) {
    if (team.team_id === teamId) {
      return {
        botToken: team.token,
        botId: team.bot_id,
        botUserId: team.bot_user_id
      };
    }
  } 
}

const bot = new App({
  authorize: authorizeFn,
  receiver: expressReceiver
});

const app = expressReceiver.app;
const state = randomString.generate(7);
const port = 3000;

app.set('view engine', 'ejs');

const slackButton = () => {
  return `<a href="https://slack.com/oauth/v2/authorize?client_id=569049821472.1042167834694&state=${state}&scope=app_mentions:read,channels:history,channels:join,chat:write,chat:write.customize,commands,emoji:read,files:read,groups:history,groups:read,im:history,im:read,im:write,links:read,links:write,mpim:history,mpim:read,mpim:write,pins:read,pins:write,reactions:read,reactions:write,users.profile:read,users:write,team:read"><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x,https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"></a>`
}

app.get('/file/:filename', function(req, res){
  const file = `${__dirname}/files/${req.params.filename}`;
  res.download(file);
});

app.get('/add', (req,res) => {
  res.write('<p>Click on the button below to add this app to your workspace</p>');
  res.write(slackButton());
  res.end();
});

app.get('/finish_auth', (req, res) => {
  if (req.query.state === state) {
    return bot.client.oauth.v2.access({
      client_id: process.env.Client_Id,
      client_secret: process.env.Client_Secret,
      code: req.query.code
    })
    .then(function (response) {
      bot.client.auth.test({
        token: response.access_token
      }).then(data => {
        let authData = {
          bot_user_id: response.bot_user_id,
          access_token: response.access_token,
          id: response.team.id,
          name: response.team.name
        };
        authData.bot_id = data.bot_id;

        if (data.ok) {
          dbHandler.saveTeam(authData)
          res.redirect(`https://app.slack.com/client/${authData.id}`);
        }
      })
      .catch(e => logger('error saving response '+ e));
    })
    .catch(function (error) {
      logger('authentication error '+ error)
    });
  }
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