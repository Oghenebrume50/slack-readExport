const fs = require('fs');

const createFolder = (path) => {
  fs.mkdir(path, {recursive: true}, (error) => {
    if(error) {
      console.log('an error occurred '+ error);
    } else {
      console.log('folder created');
    }
  });
}

const createFile = ({path, content}) => {
  fs.writeFile(path, content, (error) => {
    if(error) {
      console.log('an error occurred '+ error);
    } else {
      console.log('file created');
    }
  });
}

module.exports = {
  createFolder,
  createFile
}