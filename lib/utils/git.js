const simpleGit = require('simple-git');
const logger = require('./logger');

const git = simpleGit();

module.exports = {
  init() {
    git.init().add('./*').commit('first commit!');
    //  .addRemote('origin', 'https://github.com/user/repo.git')
    //  .push('origin', 'master');
  },
  validateBranchName(name) {
    logger.success(`Validating we are on the "${name}" branch`);
    return new Promise((resolve, reject) => {
      git.branch((err, branchSummary) => {
        if (err) reject(err);

        if (!branchSummary) {
          return reject(false);
        }

        const branchWithNameIsCurrent =
          branchSummary.branches[name] && branchSummary.branches[name].current;

        if (!branchWithNameIsCurrent) {
          reject(`Currently on the wrong branch, you should be on ${name}`);
        }

        return resolve(true);
      });
    });
  },
  getMostRecentStepNumber() {
    return new Promise((resolve, reject) => {
      git.branch((err, branchSummary) => {
        if (!branchSummary) {
          // prettier-ignore
          logger.error('It looks like git has not yet been initialized for this project.');
        }

        const allBranches = branchSummary.all;
        const allDucktypecoderSteps = allBranches.filter(
          name =>
            name.includes('ducktypecoder-step-') && !name.includes('-answer')
        );

        // TODO: handle edge case where the array has length but the step numbers therein do not go in correct order without gaps.
        resolve(allDucktypecoderSteps.length);
      });
    });
  },
  createAndCheckoutBranch(branchName) {
    return new Promise((resolve, reject) => {
      logger.success(`Creating new branch named ${branchName}`);
      git.branch([branchName]).checkout(branchName);
    });
  },
  commitContentAndTests() {
    git
      .add(['./ducktypecoder/content.md', './ducktypecoder/tests.js'])
      .commit('Adds step');
  },
  clone(url, newDirectoryName) {
    // TODO: make this work
    logger.success(`Cloning the repo: ${url}`);
    git.clone(url, newDirectoryName);
  }
};
