const { App } = require('@slack/bolt');
//const axios = require('axios');

const Token = 'xoxb-569049821472-1040770229136-8Zr9H7cNJYDOEMgilzrrWyTk';

const app = new App({
  signingSecret: '053951c5d4aced4953eecb4d6b45ba0a',
  token: 'xoxb-569049821472-1040770229136-8Zr9H7cNJYDOEMgilzrrWyTk'
});

app.event('app_mention', async({ context, event }) => {
  try {
    const response = await app.client.conversations.replies({
      token: Token,
      channel: event.channel,
      ts: event.thread_ts
    });

    await app.client.chat.postMessage({
      token: context.botToken,
      channel: event.channel,
      thread_ts: response.messages[0].ts,
      text: `This a thread test reply, <@${event.user}>! 🎉 `
    });
  } catch (error) {
    console.error(error);
  }
  
  console.log(event);
});

(async () => {
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();