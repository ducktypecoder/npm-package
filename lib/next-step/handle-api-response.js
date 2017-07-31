module.exports = function handleApiResponse(data) {
  console.log('handling the api response...');

  return new Promise(function(resolve, reject) {
    return resolve(data);
  });
};
