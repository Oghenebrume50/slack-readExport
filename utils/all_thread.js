const getAllUserMessage = (messages) => {
  const allText = [];

  messages.forEach((message) => allText.push(message.text + '\n\r'));

  return allText;
}

module.exports = getAllUserMessage;