const dbHandler = require("./dbhandler");
const fileHandler = require("./file_handler");
const bot = require("./server");
const botMention = require('./utils/bot_mention');
const check = require('./utils/check');
const logger = require('./utils/logger');

bot.event("app_mention", async ({ context, event }) => {
  try {
    const response = await bot.client.conversations.replies({
      token: process.env.Token,
      channel: event.channel,
      ts: event.thread_ts
    });

    if (botMention.botForWeb(event)) {
      if (response) {
        let urlPath = '';

        if (check(event)) {
          dbHandler.insertFirstText({
            event,
            response
          });
          urlPath = event.channel + event.thread_ts + 'first';
        } else {
          dbHandler.insertAllText({
            event,
            response
          });
          urlPath = event.channel + event.thread_ts;
        }

        await bot.client.chat.postMessage({
          token: context.botToken,
          channel: event.channel,
          thread_ts: response.messages[0].ts,
          text: `<@${event.user}> here you go ${"http://localhost:3000/" + urlPath} ! 🎉 `
        });
      }
    } else if(botMention.botForFile(event)) {
      fileHandler.sendToFile({event, response});
      await bot.client.chat.postMessage({
        token: context.botToken,
        channel: event.user,
        text: `here you go file saved in Downloads/slackReadExport ! 🎉 `
      });
    }
  } catch (error) {
    logger.info('An error occured with bot response '+ error);
  }
});
