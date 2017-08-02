const getConfig = require('../utils/get-config');
const logger = require('../utils/logger');

const getCurrentStepForProject = require('./get-current-step-for-project');
const runTestsForStep = require('./run-tests-for-step');
const submitTestResults = require('./submit-test-results');
const handleApiResponse = require('./handle-api-response');
const setupNextStep = require('./setup-next-step');
const handleError = require('./handle-error');

function nextStep() {
  logger.success('--- --- --- ---');
  logger.success('starting to check your work with ducktypecoder!');

  const config = getConfig(process.cwd());

  return getCurrentStepForProject(config)
    .then(({ currentStep, tests }) => {
      if (currentStep == 'conclusion') {
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
    .then(() => {
      logger.success('--- --- --- ---');
    })
    .catch(error => handleError(error));
}

module.exports = nextStep;
