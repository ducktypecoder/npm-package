var path = require('path');
var simpleGit = require('simple-git');
var files = require('./files');
var logger = require('./logger');

var git = simpleGit();

module.exports = {
  init() {
    git.init().add('./*').commit('first commit!');
    //  .addRemote('origin', 'https://github.com/user/repo.git')
    //  .push('origin', 'master');
  },
  validateBranchName(name) {
    logger.success('Validating we are on the "' + name + '" branch');
    return new Promise(function(resolve, reject) {
      git.branch((err, branchSummary) => {
        if (err) reject(err);

        if (!branchSummary) {
          return reject(false);
        }

        var branchWithNameIsCurrent =
          branchSummary.branches[name] && branchSummary.branches[name].current;

        if (!branchWithNameIsCurrent) {
          reject('Currently on the wrong branch, you should be on ' + name);
        }

        return resolve(true);
      });
    });
  }
};
