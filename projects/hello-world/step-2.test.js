// This test is specifically for step 1 of the Hello World project.
// In that project, we should find a file '/src/say-hello',
// and that file should export the function 'sayHello'.
//
// That project includes this package, 'ducktypecoder', and these
// tests are within the ducktypecoder package.
//
// When the test runner runs, it first will copy this file into
// the working project root directory. Import files as if
// you are in that root directory.
//
// In these tests, we want to import the 'sayHello' functions
// and test that it works as expected.

// first, import the file:
var sayHello = require('./src/say-hello');

// second, test that it works:
it('says hello world', () => {
  expect(sayHello()).toEqual('Hello world');
});
