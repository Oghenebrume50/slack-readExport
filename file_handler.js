const manageFile = require('./utils/file');
const getAllMessages = require('./utils/all_thread');

const path =  require('os').homedir()+'/Downloads/slackReadExport/';

const sendToFile = ({event, response}) => {
  console.log(response);
  console.log('rrrrrrrrrrrrrrrrr');
  console.log(response.messages);
  
  manageFile.createFolder(path);
  const givenFilename = event.text.slice(event.text.indexOf('-f') + 3);
  const defaultFilename = event.channel + event.thread_ts + '.txt';
  const filename = givenFilename || defaultFilename;
  const content = getAllMessages(response.messages);

  manageFile.createFile({
    path: path + filename,
    content: content.toString()
  });
}

module.exports = { 
  sendToFile
};