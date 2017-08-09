const localhostUrl = 'http://localhost:3000/api';
const productionUrl = 'http://ducktypecoder.herokuapp.com/api';

module.exports = function getApiUrl() {
  try {
    const getConfig = require('./get-config');

    return getConfig().development ? localhostUrl : productionUrl;
  } catch (e) {
    return localhostUrl; // when starting a project, we do not yet have any ducktypecoder config
  }
};
