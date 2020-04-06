const botForWeb = (event) => {
  const text = '<@U0116NN6R40>';
  const firstText = '<@U0116NN6R40> first';

  return event.text === text || event.text === firstText ? true : false;
}

const botForFile = (event) => {
  const text = '<@U0116NN6R40> -f';

  return event.text.includes(text) ? true : false;
}

module.exports = {
  botForWeb,
  botForFile
}