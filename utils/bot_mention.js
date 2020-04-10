const botForWeb = (event) => {
  const text = /^<@\w+>$/i;
  const firstText = /^<@\w+> first$/i;

  return text.test(event.text) || firstText.test(event.text) ? true : false;
}

const botForFile = (event) => {
  const text = /^<@\w+> -f */i;

  return event.text.search(text) == 0 ? true : false;
}

module.exports = {
  botForWeb,
  botForFile
}