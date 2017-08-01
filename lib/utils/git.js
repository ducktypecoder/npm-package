const simpleGit = require('simple-git/promise');
const logger = require('./logger');
const files = require('./files');

const git = simpleGit();

module.exports = {
  init() {
    // TODO: only init if not yet initialized
    if (files.directoryExists('./.git')) return;

    logger.success('Initializing git...');
    git
      .init()
      .then(() => {
        files.createFile('foobar.js');
        files.writeToFile('foobar.js', '// foobar');
        git.add('./*');
      })
      .then(() => git.commit('first commit!'))
      .catch(err => console.log('error initializing git: ', err));
    //  .addRemote('origin', 'https://github.com/user/repo.git')
    //  .push('origin', 'master');
  },
  validateBranchName(name) {
    logger.success(`Validating we are on the "${name}" branch`);

    return git
      .branch()
      .then(branchSummary => {
        if (!branchSummary) {
          throw new Error('Git is not initialized');
        }

        console.log({ branchSummary });

        const branchWithNameIsCurrent =
          branchSummary.branches[name] && branchSummary.branches[name].current;

        if (!branchWithNameIsCurrent) {
          throw new Error(
            `Currently on the wrong branch, you should be on ${name}`
          );
        }

        return true;
      })
      .catch(err => console.log('err: ', err));
    // });
  },
  getMostRecentStepNumber() {
    return git.branch().then(branchSummary => {
      if (!branchSummary) {
        // prettier-ignore
        logger.error('It looks like git has not yet been initialized for this project.');
      }

      const allBranches = branchSummary.all;
      const allDucktypecoderSteps = allBranches.filter(
        name =>
          name.includes('ducktypecoder-step-') && !name.includes('-answer')
      );

      console.log({ allDucktypecoderSteps });

      // TODO: handle edge case where the array has length but the step numbers therein do not go in correct order without gaps.
      return allDucktypecoderSteps.length;
    });
  },
  branch(branchName) {
    logger.success(`Creating new branch named ${branchName}`);
    return git.branch([branchName]);
  },
  checkout(branchName) {
    logger.success('checking out branch...');
    return git.checkout(branchName);
  },
  commitContentAndTests() {
    git
      .add(['./ducktypecoder/content.md', './ducktypecoder/tests.js'])
      .then(git.commit('Adds step'));
  },
  clone(url, newDirectoryName) {
    return git.clone(url, newDirectoryName);
  }
};
