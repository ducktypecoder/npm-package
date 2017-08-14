const inquirer = require('inquirer');
const getConfig = require('../utils/get-config');
const files = require('../utils/files');
const logger = require('../utils/logger');

function saveAnswers(answers) {
  const configPath = `${process.cwd()}/ducktypecoder/config.json`;
  const existingConfig = require(configPath);
  const author = existingConfig.author || {};

  const newConfig = Object.assign({}, existingConfig, {
    author: {
      email: answers.author.email || author.email,
      name: answers.author.name || author.name,
      twitter: answers.author.twitter || author.twitter,
      website: answers.author.website || author.website
    }
  });

  files.writeToFile(configPath, JSON.stringify(newConfig));
  logger.success('Got it!');
}

module.exports = function editAuthor() {
  const config = getConfig();

  // get the existing author config, if any
  const author = config.author || {};

  // and start prompting the user to add or edit the author info
  const questions = [
    {
      type: 'input',
      name: 'author.email',
      message: `Author's email address: ${author.email
        ? `leave blank to keep as: ${author.email}`
        : ''}`
    },
    {
      type: 'input',
      name: 'author.name',
      message: `Author's name: ${author.name
        ? `leave blank to keep as: ${author.name}`
        : ''}`
    },
    {
      type: 'input',
      name: 'author.twitter',
      message: `Author's twitter handle: ${author.twitter
        ? `leave blank to keep as: ${author.twitter}`
        : ''}`
    },
    {
      type: 'input',
      name: 'author.website',
      message: `Author's website: ${author.website
        ? `leave blank to keep as: ${author.website}`
        : ''}`
    }
  ];
  inquirer.prompt(questions).then(saveAnswers);
};
