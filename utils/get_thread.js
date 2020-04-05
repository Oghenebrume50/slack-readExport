const getAllUserMessage = (messages) => {
  const allText = [];

  messages.forEach((message) => {
    if (!message.bot_id && !message.text.includes('<@U0116NN6R40>')) {
      allText.push(message.text + '\n\r');
    }
  });

  return allText;
}

const getFirstUserMessage = (messages) => {
  return messages[0].text;
}

module.exports = {
  getAllUserMessage,
  getFirstUserMessage
};