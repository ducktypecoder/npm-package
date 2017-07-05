module.exports = function runTestsForStep(config, step) {
  try {
    console.log('running tests for step ' + step);

    // get the filename for the current step's tests
    var testPath = '../projects/' + config.project + '/step-' + step;
    var perform = require(testPath);
    var allPassing = perform();

    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve(allPassing);
      }, 1000);
    });
  } catch (e) {
    console.log(e.message);
    throw e;
  }
};
