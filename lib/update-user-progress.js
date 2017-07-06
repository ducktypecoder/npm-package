var getCurrentStepForProject = require('./get-current-step-for-project');
var runTestsForStep = require('./run-tests-for-step');
var submitTestResults = require('./submit-test-results');
var handleApiResponse = require('./handle-api-response');
var handleError = require('./handle-error');

var axios = require('axios');

module.exports = function updateUserProgress(config) {
  return getCurrentStepForProject(config)
    .then(step => {
      config.currentStep = step;
      return runTestsForStep(config, step);
    })
    .then(result => {
      config.result = result;
      return submitTestResults(config);
    })
    .then(data => {
      if (data.skipSubmit) return;
      return handleApiResponse(data);
    })
    .catch(error => handleError(error));
};
