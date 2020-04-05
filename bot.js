const dbHandler = require("./dbhandler");
const fileHandler = require("./file_handler");
const bot = require("./server");
const botMention = require('./utils/bot_mention');

bot.event("app_mention", async ({ context, event }) => {
  try {
    const response = await bot.client.conversations.replies({
      token: process.env.Token,
      channel: event.channel,
      ts: event.thread_ts
    });

    if (botMention.onlyBotName(event)) {
      if (response) {
        console.log("in response");

        dbHandler.insertAllText({
          event,
          response
        });

        await bot.client.chat.postMessage({
          token: context.botToken,
          channel: event.channel,
          thread_ts: response.messages[0].ts,
          text: `<@${event.user}> here you go ${"http://localhost:3000/" +
            event.channel +
            event.thread_ts} ! 🎉 `
        });
      }
    } else if(botMention.botForFile(event)) {
      console.log('in file now');
      console.log(response);
      fileHandler.sendToFile({event, response});
    }
  } catch (error) {
    console.error(error);
  }

  console.log(event);
});
