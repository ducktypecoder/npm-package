const getCurrentStepForProject = require('./get-current-step-for-project');
const runTestsForStep = require('./run-tests-for-step');
const submitTestResults = require('./submit-test-results');
const handleApiResponse = require('./handle-api-response');
const setupNextStep = require('./setup-next-step');
const handleError = require('./handle-error');

const axios = require('axios');

module.exports = function updateUserProgress(config) {
  return getCurrentStepForProject(config)
    .then(({ currentStep, tests }) => {
      if (currentStep && currentStep.finished) {
        console.log('You are all finished! Yay!');
        return false;
      }
      config.currentStep = currentStep;
      config.tests = tests;
      console.log(`You are currently working on step ${currentStep}`);
      return runTestsForStep(config, currentStep);
    })
    .then(result => {
      if (!result) return;
      config.result = result;
      return submitTestResults(config);
    })
    .then(data => {
      if (!data || data.skipSubmit) return;
      return handleApiResponse(data);
    })
    .then(() => {
      if (config.result) setupNextStep(config);
    })
    .catch(error => handleError(error));
};
