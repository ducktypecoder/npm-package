var fs = require('fs');
var path = require('path');
var logger = require('./logger');

module.exports = {
  getCurrentDirectoryBase: function() {
    return path.basename(process.cwd());
  },

  directoryExists: function(filePath) {
    try {
      return fs.statSync(filePath).isDirectory();
    } catch (err) {
      return false;
    }
  },

  createDirectory(name) {
    if (this.directoryExists(name)) {
      return logger.error('A directory already exists with that name.');
    }

    fs.mkdirSync(name);

    if (!this.directoryExists(name)) {
      return logger.success('Failed to create project directory.');
    }

    if (this.directoryExists(name)) {
      return logger.success('Created a ' + name + ' directory');
    }
  },

  changeIntoDirectory(name) {
    process.chdir(name);

    if (!process.cwd().includes(name)) {
      logger.error('Could not change into the project directory');
      return;
    }

    logger.success('Changed into directory ' + name);
  },

  createFile(name) {
    fs.writeFileSync(name);
    logger.success('Created the ' + name + ' file');
  },

  removeFile(name) {
    fs.unlinkSync(name);
    logger.success('Removed the ' + name + ' file');
  },

  writeToFile(name, content) {
    fs.writeFileSync(name, content);
  },

  readFile(name) {
    return fs.readFileSync(name, 'utf-8');
  }
};
