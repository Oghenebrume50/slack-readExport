const onlyBotName = (event) => {
  text = '<@U0116NN6R40>';

  return event.text === text ? true : false;
}

const botForFile = (event) => {
  text = '<@U0116NN6R40> -f';

  return event.text.includes(text) ? true : false;
}

const onlyFirstText = (event) => {
  text = '<@U0116NN6R40> first';

  
}

module.exports = {
  onlyBotName,
  botForFile,
  onlyFirstText
}