const getConfig = require('./get-config');

module.exports = function getApiUrl() {
  return getConfig().development
    ? 'http://localhost:3000/api'
    : 'http://ducktypecoder.herokuapp.com/api';
};
