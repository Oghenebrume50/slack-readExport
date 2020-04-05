const getAllUserMessage = (messages) => {
  const allText = [];

  messages.forEach((message) => allText.push(message.text));

  return allText;
}

module.exports = getAllUserMessage;