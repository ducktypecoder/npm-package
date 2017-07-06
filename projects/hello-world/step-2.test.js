// We passed the first step in the project. Now we will test for step 2.

// first, import the file:
var sayMyName = require('./src/say-my-name');

// second, test that it works:
it('says my name', () => {
  const name = 'bob';
  expect(sayMyName(name)).toEqual(name);
});
