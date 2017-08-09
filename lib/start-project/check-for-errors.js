const files = require('../utils/files');

module.exports = function checkForErrors() {
  return new Promise((resolve, reject) => {
    if (files.directoryExists('./ducktypecoder')) {
      reject(
        'We see a ducktypecoder directory already exists, are you already in a ducktypecoder project?'
      );
    }

    resolve(false);
  });
};
