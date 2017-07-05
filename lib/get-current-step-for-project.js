// ping api to find out what our current step is for this project
// TODO: get user's current step for the project

module.exports = function getCurrentStepForProject(config) {
  console.log('asking for current step...');
  var project = config.project;

  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      var step = '1';
      resolve(Number(step));
    }, 1000);
  });
};
