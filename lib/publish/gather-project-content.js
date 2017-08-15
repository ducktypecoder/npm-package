const git = require('simple-git')();
const files = require('../utils/files');

const contentObject = {
  introduction: '',
  steps: [],
  conclusion: ''
};

const contentFilePath = './ducktypecoder/content.md';

function getStepBranches(branchSummary) {
  return branchSummary.all.filter(b => /ducktypecoder-step-[0-9]$/.test(b));
}

// TODO: refactor this async mess
module.exports = function gatherProjectContent() {
  return new Promise((resolve, reject) => {
    git
      // checkout master and copy the introduction content
      .checkout('master')
      .exec(
        () => (contentObject.introduction = files.readFile(contentFilePath))
      )
      // then get the conclusion
      .checkout('ducktypecoder-conclusion')
      .exec(() => (contentObject.conclusion = files.readFile(contentFilePath)))
      // then grab all the step contents in sequence
      .branch((err, branchSummary) => {
        getStepBranches(branchSummary).forEach((b, i) => {
          git.checkout(b).exec(() => {
            contentObject.steps.push({
              content: files.readFile(contentFilePath),
              order: i + 1
            });
            const isLast = i == getStepBranches(branchSummary).length - 1;

            // finally, back to master and send along all the content
            if (isLast) {
              git.checkout('master', () => {
                resolve(contentObject);
              });
            }
          });
        });
      });
  });
};
