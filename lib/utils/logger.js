const chalk = require('chalk');
const figlet = require('figlet');

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
  },

  logo: function logo() {
    console.log(
      chalk.yellow(
        figlet.textSync('ducktypecoder', { horizontalLayout: 'full' })
      )
    );
  }
};
