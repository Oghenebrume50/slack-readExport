const getAllUserMessage = (messages) => {
  const allText = [];

  messages.filter((message) => {
    if (!message.bot_id && !message.text.includes('<@U0116NN6R40>')) {
      allText.push(message.text + '\n\r')
    }
  });
  
  return allText;
}

module.exports = getAllUserMessage;