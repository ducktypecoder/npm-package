var axios = require('axios');

// ping api to find out what our current step is for this project
module.exports = function getCurrentStepForProject(config) {
  console.log('getting current step...');

  return axios
    .get(config.apiUrl + '/current-step', {
      params: { token: config.token, project: config.project }
    })
    .then(response => {
      if (response.data.error) throw new Error(response.data.error);

      const currentStep = response.data.order;

      console.log('You are currently working on step ' + currentStep);
      return currentStep;
    });
};
