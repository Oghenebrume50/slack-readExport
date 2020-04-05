const manageFile = require('./utils/file');
const getMessages = require('./utils/get_thread');
const check = require('./utils/check');

const path =  require('os').homedir()+'/Downloads/slackReadExport/';

const sendToFile = ({event, response}) => {
  manageFile.createFolder(path);
  let givenFilename = '';
  let content = '';

  if(check(event)) {
    givenFilename = event.text.slice(event.text.indexOf('first') + 6);
    content = getMessages.getFirstUserMessage(response.messages);
  } else {
    givenFilename = event.text.slice(event.text.indexOf('-f') + 3);
    content = getMessages.getAllUserMessage(response.messages);
  }

  const defaultFilename = event.channel + event.thread_ts + '.txt';
  const filename = givenFilename || defaultFilename;

  manageFile.createFile({
    path: path + filename,
    content: content.toString()
  });
}


module.exports = { 
  sendToFile
};