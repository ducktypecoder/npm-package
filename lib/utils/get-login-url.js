const program = require('commander');

const localhostUrl = 'http://localhost:3000/login';
const productionUrl = 'http://www.ducktypecoder.com/login'; // TODO: setup SSL

module.exports = function getApiUrl() {
  return program.development ? localhostUrl : productionUrl;
};
