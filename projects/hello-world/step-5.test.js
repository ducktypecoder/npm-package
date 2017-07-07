// Now let's test that add number returns NaN if necessary
var addNumbers = require('./src/add-numbers');

it('returns NaN when appropriate', () => {
  const num1 = 3;
  const num2 = {};

  const result = addNumbers(num1, num2);
  expect(isNaN(result)).toEqual(true);
});
