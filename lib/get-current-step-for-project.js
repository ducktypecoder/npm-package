var axios = require('axios');

// ping api to find out what our current step is for this project
module.exports = function getCurrentStepForProject(config) {
  return axios
    .get(config.apiUrl + '/current-step', {
      params: { token: config.token, project: config.project }
    })
    .then(response => {
      if (response.data.error) throw new Error(response.data.error);
      if (!response.data.order && !response.data.finished)
        throw new Error(
          'We could not retrieve the current step from the server.'
        );

      if (response.data.finished) return { currentStep: { finished: true } };

      const currentStep = response.data.order;
      const tests = response.data.tests;

      return { currentStep, tests };
    });
};
