const axios = require('axios');

const getApiUrl = require('../utils/get-api-url');
const logger = require('../utils/logger');

function identifierIsUrl(projectIdentifier) {
  // TODO: verify that .startsWith() works on older node versions, use shim if necessary
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
  // QUESTION: can we use urls starting that omit 'https' and start with 'www'?
  return (
    projectIdentifier.startsWith('http') || projectIdentifier.startsWith('git@')
  );
}

module.exports = function getProjectUrl(projectIdentifier) {
  if (identifierIsUrl(projectIdentifier)) return projectIdentifier;

  logger.info('Retrieving project info...');
  return axios
    .get(`${getApiUrl()}/project-repo?slug=${projectIdentifier}`)
    .then(response => {
      if (response.data.error) throw new Error(response.data.error);

      return response.data.repo;
    })
    .catch(e => console.log({ error: e }));
};
