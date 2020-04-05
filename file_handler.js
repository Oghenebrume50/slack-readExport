const manageFile = require('./utils/file');
const getAllMessages = require('./utils/all_thread');

const path =  require('os').homedir()+'/Downloads/slackReadExport/';

const sendToFile = ({event, response}) => {
  manageFile.createFolder(path);
  const filename = event.channel + event.thread_ts;
  const content = getAllMessages(response.messages);

  manageFile.createFile({
    path: path + filename + '.txt', 
    content: content.toString()
  });
}

module.exports = { 
  sendToFile
};