const getConfig = require('../utils/get-config');
const configstore = require('../utils/configstore');
const logger = require('../utils/logger');

module.exports = function getErrors() {
  return new Promise((resolve, reject) => {
    logger.info('Checking for errors...');
    const errorMessages = [];
    const authenticationErrors = checkAuthentication();
    const repoErrors = checkRepoErrors();
    const authorErrors = checkAuthorErrors();

    if (authenticationErrors) errorMessages.push(authenticationErrors);
    if (repoErrors) errorMessages.push(repoErrors);
    if (authorErrors) errorMessages.push(authorErrors);

    const filteredMessages = errorMessages.filter(
      i => typeof i !== 'undefined'
    );
    const hasErrors = filteredMessages.length > 0;

    if (hasErrors) {
      reject(filteredMessages);
    } else {
      resolve(filteredMessages);
    }
  });
};

function checkAuthentication() {
  const user = configstore.get('user');
  const tokens = configstore.get('tokens');

  if (!user || !tokens) {
    return 'You need to be logged in before publishing your project.';
  }
}

function checkRepoErrors() {
  // TODO:
  // - validate that the remote 'origin' exists
  // - validate that the branching structure meets the ducktypecoder spec
  //   - has master, steps in ascending order, each  with answer, and a conclusion
  //   - each branch has ducktypecoder folder with config, content, tests
}

function checkAuthorErrors() {
  const config = getConfig();
  if (!config.author) {
    return 'Your project config needs some author info, try running "ducktypecoder edit author"';
  }

  if (!config.author.name) {
    return 'Your project config needs the author\'s name, try running "ducktypecoder edit author"';
  }

  if (!config.author.email) {
    return 'Your project config needs the author\'s email, try running "ducktypecoder edit author"';
  }
}
