const fs = require('fs');
const logger = require('./logger');

const createFile = ({path, content}) => {
  fs.writeFile(path, content, (error) => {
    if(error) {
      logger.info("An error occured in file creation "+  error);
    } 
  });
}

module.exports = {
  createFile
}