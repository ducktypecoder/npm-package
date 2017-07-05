module.exports = function submitAnswer(config, results) {
  console.log('submitting results to the api: ', results);

  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve({ results: results, correct: results });
    }, 1000);
  });
};
