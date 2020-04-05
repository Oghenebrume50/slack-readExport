const checkForFirst = (event) => {
  return /\sfirst($|\s*)/i.test(event.text);
}

module.exports = checkForFirst;