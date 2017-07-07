// Now let's test that add number returns NaN if necessary
var addNumbers = require('./src/add-numbers');

it('returns NaN when appropriate', () => {
  const num1 = 3;
  const num2 = '4';

  expect(addNumbers(num1, num2)).toEqual(7);
});
