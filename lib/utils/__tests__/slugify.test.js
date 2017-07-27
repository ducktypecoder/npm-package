var slugify = require('../slugify.js');

it('replaces spaces with hyphens', () => {
  var text = 'Foo Bar';
  var expected = 'foo-bar';
  var result = slugify(text);
  expect(result).toEqual(expected);
});
