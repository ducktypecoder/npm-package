const program = require('commander');

const localhostUrl = 'http://localhost:3000/api';
const productionUrl = 'https://www.ducktypecoder.com/api';

module.exports = function getApiUrl() {
  return program.development ? localhostUrl : productionUrl;
};
