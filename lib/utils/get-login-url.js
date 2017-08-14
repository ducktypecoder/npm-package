const localhostUrl = 'http://localhost:3000/login';
const productionUrl = 'http://www.ducktypecoder.com/login'; // TODO: setup SSL

module.exports = function getApiUrl() {
  try {
    const getConfig = require('./get-config');

    return getConfig().development ? localhostUrl : productionUrl;
  } catch (e) {
    // when starting a project, we do not yet have any ducktypecoder config
    // so we end up here, return the api you want.
    // TODO: find a way to set 'development' flag

    // return localhostUrl;
    return productionUrl;
  }
};
