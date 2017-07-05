// perform all tests in an array, returns whether they all pass
module.exports = function perform(tests) {
  var results = [];
  tests.forEach(test => {
    var actual = test[1];
    var expected = test[2];
    results.push(actual == expected);
  });
  return results.indexOf(false) == -1;
};
