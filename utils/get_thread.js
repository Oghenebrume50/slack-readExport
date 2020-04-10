const getAllUserMessage = (messages, event) => {
  const allText = [];
  const event_text = event.text.slice(0, event.text.indexOf('>') + 1);
  
  messages.forEach((message) => {
    const message_text = message.text.slice(0, message.text.indexOf('>') + 1);
    if (!message.bot_id && event_text !== message_text) {
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