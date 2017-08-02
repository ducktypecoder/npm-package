const files = require('../utils/files');
const logger = require('../utils/logger');

module.exports = function showInfo() {
  const content = files.readFile(`${process.cwd()}/ducktypecoder/content.md`);

  logger.success('--- --- --- ---');
  logger.fileMarkdown(content);
};
