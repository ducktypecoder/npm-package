const logger = require('../utils/logger');

module.exports = function getErrors() {
  return new Promise((resolve, reject) => {
    logger.info('Checking for errors...');
    const errorMessages = [];
    const repoErrors = checkRepoErrors();
    const authorErrors = checkAuthorErrors();

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

function checkRepoErrors() {
  // TODO:
  // - validate that the remote 'origin' exists
  // - validate that the branching structure meets the ducktypecoder spec
  //   - has master, steps in ascending order, each  with answer, and a conclusion
  //   - each branch has ducktypecoder folder with config, content, tests
}
function checkAuthorErrors() {
  // TODO: validate that the author has enough info
  // name, email required
  // could add command `ducktypecoder author` that prompts for all data
}