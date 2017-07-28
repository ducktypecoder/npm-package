const git = require('../utils/git');
const logger = require('../utils/logger');

function identifierIsName(projectIdentifier) {
  // TODO: verify that .startsWith() works on older node versions, use shim if necessary
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
  return (
    !projectIdentifier.startsWith('http') &&
    !projectIdentifier.startsWith('git@')
  );
}

module.exports = function startProject(args) {
  console.log('start project...');

  const projectIdentifier = args[1];
  let name;

  // TODO: when user runs 'ducktypecoder start' without a project name or url
  // then we should show a list of possible projects that exist on the platform
  if (!projectIdentifier) {
    logger.error('Please provide a project name or url');
    return;
  }

  if (identifierIsName(projectIdentifier)) {
    // hit the api, get the project info, and then get the github url
    logger.error(
      'We do not yet support using just the project name, please give a github repo url.'
    );
  }

  // clone the project from github using the url
  git.clone(projectIdentifier, getNameFromGithubUrl(projectIdentifier));
};

// TODO: put into new module
function getNameFromGithubUrl(projectIdentifier) {
  if (projectIdentifier.startsWith('git')) {
    return projectIdentifier.match(/([^/]+)\.git$/)[0].replace('.git', '');
  }

  if (projectIdentifier.startsWith('http')) {
    return projectIdentifier.match(/([^/]+$)/)[0];
  }
}
