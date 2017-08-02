const getConfig = require('../utils/get-config');
const updateUserProgress = require('./update-user-progress');

const logger = require('../utils/logger');
const { spawn } = require('child_process');

let projectDirectory;

function nextStep() {
  logger.success('--- --- --- ---');
  logger.success('starting to check your work with ducktypecoder!');

  updateUserProgress(getConfig(process.cwd())).then(() => {
    logger.success('--- --- --- ---');
    process.exit(0);
  });
}

module.exports = nextStep;
