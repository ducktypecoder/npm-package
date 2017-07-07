var addNumbers = require('./src/add-numbers');

// second, test that it works:
it('adds numbers', () => {
  const num1 = 3;
  const num2 = 4;
  expect(addNumbers(num1, num2)).toEqual(7);
});
