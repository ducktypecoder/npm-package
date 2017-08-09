const git = require('simple-git/promise')();
const files = require('../utils/files');
const logger = require('../utils/logger');

const checkForErrors = require('./check-for-errors');
const getProjectUrl = require('./get-project-url');
const getProjectSlugFromGithubUrl = require('./get-project-slug-from-github-url');

module.exports = function startProject(args) {
  console.log('start project...');

  const projectIdentifier = args[1];

  if (!projectIdentifier) {
    // TODO: when user runs 'ducktypecoder start' without a project name or url
    // then we should show a list of possible projects that exist on the platform
    logger.error('Please provide a project name or url');
    return;
  }

  let projectUrl;
  let projectSlug;

  checkForErrors()
    .then(message => {
      if (message) throw new Error(message);
      return getProjectUrl(projectIdentifier);
    })
    .then(result => {
      projectUrl = result;
      return getProjectSlugFromGithubUrl(projectUrl);
    })
    .then(result => {
      projectSlug = result;
      return git.clone(projectUrl, projectSlug);
    })
    .then(() => {
      logger.info('Setting up local project...');
      files.changeIntoDirectory(projectSlug);
      // NOTE: need to require simple-git again here, otherwise
      // we get error 'fatal: Not a git repository (or any of the parent directories): .git'
      // git.createAndCheckoutBranch('working')                        // <-- broken
      require('simple-git')().branch(['working']).checkout('working'); // <-- works

      logger.success(
        `
      You are ready to get started! Change into the new project with the command'cd ${projectSlug}'
      Read the introduction in /ducktypecoder/content.md. (Try the command 'ducktypeoder view').
      Then, when you are ready, run the command "ducktypecoder next"
      `
      );
    })
    .catch(err => logger.error(err));
};
