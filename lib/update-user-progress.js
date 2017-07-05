var getCurrentStepForProject = require('./get-current-step-for-project');
var runTestsForStep = require('./run-tests-for-step');
var submitTestResults = require('./submit-test-results');
var handleApiResponse = require('./handle-api-response');

module.exports = function updateUserProgress(config) {
  return getCurrentStepForProject(config)
    .then(step => runTestsForStep(config, step))
    .then(results => submitTestResults(config, results))
    .then(response => { handleApiResponse(response)});
}
