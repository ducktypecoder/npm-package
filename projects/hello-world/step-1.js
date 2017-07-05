var perform = require('../../lib/test-framework');

var tests = [
  ['finds the correct files', true, true],
  ['finds the correct functions and objects', true, true],
  ['functions work as expected', true, true]
];

module.exports = () => perform(tests);
