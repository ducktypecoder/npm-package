module.exports = function handleApiResponse(response) {
  console.log('handling the api response...');

  return new Promise(function(resolve, reject) {
    response.correct ? console.log('all passing!') : console.log('some failing :(');

    return resolve(true);
  });
};
