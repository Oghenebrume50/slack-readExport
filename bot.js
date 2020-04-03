const { App } = require('@slack/bolt');
const dbHandler = require('./dbhandler');

//const axios = require('axios');

const port = 3000;

const Token = 'xoxb-569049821472-1040770229136-8Zr9H7cNJYDOEMgilzrrWyTk';

const bot = new App({
  signingSecret: '053951c5d4aced4953eecb4d6b45ba0a',
  token: 'xoxb-569049821472-1040770229136-8Zr9H7cNJYDOEMgilzrrWyTk'
});

const { app } = bot.receiver;

bot.event('app_mention', async({ context, event }) => {
  try {
    const response = await bot.client.conversations.replies({
      token: Token,
      channel: event.channel,
      ts: event.thread_ts
    });

    if (response) {
      console.log('in response');
      
      await bot.client.chat.postMessage({
        token: context.botToken,
        channel: event.channel,
        thread_ts: response.messages[0].ts,
        text: `<@${event.user}> here you go ${'http://localhost:3000/'+event.channel + event.thread_ts} ! 🎉 `
      });
    }

  } catch (error) {
    console.error(error);
  }
  
  console.log(event);
});

(async () => {
  await bot.start(process.env.PORT || port);

  console.log('⚡️ Bolt app is running!');
})();

module.exports = app;