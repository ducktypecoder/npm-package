const git = require('../utils/git');
const files = require('../utils/files');
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

  // TODO: when user runs 'ducktypecoder start' without a project name or url
  // then we should show a list of possible projects that exist on the platform
  if (!projectIdentifier) {
    logger.error('Please provide a project name or url');
    return;
  }

  if (identifierIsName(projectIdentifier)) {
    // TODO: hit the api, get the project info, and then get the github url
    logger.error(
      'We do not yet support using just the project name, please give a github repo url.'
    );
  }

  const projectSlug = getNameFromGithubUrl(projectIdentifier);

  git
    .clone(projectIdentifier, projectSlug)
    .then(() => {
      console.log('changing into new directory...');
      files.changeIntoDirectory(projectSlug);
      // NOTE: need to require simple-git again here, otherwise
      // we get error 'fatal: Not a git repository (or any of the parent directories): .git'
      // git.createAndCheckoutBranch('working')                        // <-- broken
      require('simple-git')().branch(['working']).checkout('working'); // <-- works

      logger.success(
        `
      You are ready to get started! Change into the new project with command 'cd ${projectSlug}'
      and read the /ducktypecoder.md content and, when ready, run the command "ducktypecoder next"
      `
      );
    })
    .catch(err => console.log('err: ', err));
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
