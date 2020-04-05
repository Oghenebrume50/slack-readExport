const onlyBotName = (event) => {
  text = '<@U0116NN6R40>';

  return event.text === text ? true : false
}

const botForFile = (event) => {
  text = '<@U0116NN6R40> -f';

  return event.text.includes(text) ? true : false
}

module.exports = {
  onlyBotName,
  botForFile
}