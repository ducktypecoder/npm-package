const configstore = require('../utils/configstore');
const logger = require('../utils/logger');

module.exports = function logout() {
  configstore.delete('user');
  configstore.delete('tokens');
  logger.success('You are logged out.');
};
