const fs = require('fs');

const createFolder = (path) => {
  fs.mkdir(path, {recursive: true}, (error) => {
    if(error) {
      logger.info("An error occured in folder creation "+  error);
    } 
  });
}

const createFile = ({path, content}) => {
  fs.writeFile(path, content, (error) => {
    if(error) {
      logger.info("An error occured in file creation "+  error);
    } 
  });
}

module.exports = {
  createFolder,
  createFile
}