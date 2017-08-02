const chalk = require('chalk');

module.exports = {
  error: function error(message) {
    console.log(chalk.red(message));
  },

  success: function success(message) {
    console.log(chalk.green(message));
  },

  info: function info(message) {
    console.log(message);
  },

  fileMarkdown: function fileMarkdown(text) {
    console.log(text);
  }
};
