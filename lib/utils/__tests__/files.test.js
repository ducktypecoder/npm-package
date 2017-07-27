var fs = require('fs');
var path = require('path');

var files = require('../files');
var getCurrentDirectoryBase = files.getCurrentDirectoryBase;
var directoryExists = files.directoryExists;

const directoryName = 'foo';

beforeEach(() => {
  if (!directoryExists(directoryName)) fs.mkdirSync(directoryName);
});

afterEach(() => {
  if (directoryExists(directoryName)) fs.rmdirSync(directoryName);

  if (process.cwd().includes('foo')) {
    console.log('changing to parent');
    process.chdir('..'); // go back to the parent directory if necessary
  }
});

it('knows that a directory exists', () => {
  expect(directoryExists(directoryName)).toEqual(true);
});

it('knows that a directory does not exist', () => {
  expect(directoryExists('banana split')).toEqual(false);
});

it('knows the current directory path', () => {
  expect(getCurrentDirectoryBase()).toMatch('npm-package');
});

it('changes directories', () => {
  files.changeIntoDirectory(directoryName);

  const cwd = process.cwd();
  expect(cwd).toMatch(directoryName);
});

it('creates a file', () => {
  const fileName = 'foobar.md';

  files.changeIntoDirectory(directoryName);
  files.createFile(fileName);
  const result1 = fs.existsSync(fileName);

  expect(result1).toEqual(true);

  files.removeFile(fileName);
  const result2 = fs.existsSync(fileName);

  expect(result2).toEqual(false);
});

it('writes and then reads to a file', () => {
  const fileName = 'foobar.md';
  const testContent = 'foobar bazbam test content';

  files.changeIntoDirectory(directoryName);
  files.createFile(fileName);
  files.writeToFile(fileName, testContent);

  const result = files.readFile(fileName);
  expect(result).toEqual(testContent);

  files.removeFile(fileName);
});
