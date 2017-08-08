const git = require('simple-git/promise')();
const axios = require('axios');
const getApiUrl = require('../utils/get-api-url');
const getConfig = require('../utils/get-config');

module.exports = function postProjectToApi() {
  const config = getConfig();

  return git
    .getRemotes(true)
    .then(remotes => {
      const origin = remotes.find(r => r.name === 'origin');

      return axios.post(`${getApiUrl()}/publish`, {
        repo: origin.refs.fetch
      });
    })
    .then(response => {
      if (response.data.error) throw new Error(response.data.error);
      console.log({ response });

      if (response.data.success) return true;

      throw new Error(response.data.error);
    });
};
