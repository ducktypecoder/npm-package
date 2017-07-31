var axios = require('axios');

// return new Promise(function(resolve, reject) {
//   console.log('submitting result (TODO)');
//   setTimeout(function() {
//     resolve({ result: result, correct: result });
//   }, 1000);
// });

module.exports = function submitTestResults(config) {
  if (!config.result) return { skipSubmit: true };

  const url = config.apiUrl + '/answers';
  console.log('submitting result...');

  const requestData = {
    token: config.token,
    project: config.project,
    answer: config.result,
    step: config.currentStep
  };

  return axios.post(url, requestData).then(response => {
    if (response.data.error) throw new Error(response.data.error);

    return response.data;
  });
};
