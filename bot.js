const dbHandler = require("./dbhandler");
const bot = require("./server");

bot.event("app_mention", async ({ context, event }) => {
  try {
    const response = await bot.client.conversations.replies({
      token: process.env.Token,
      channel: event.channel,
      ts: event.thread_ts
    });

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
  } catch (error) {
    console.error(error);
  }

  console.log(event);
});
