const express = require('express');
const opn = require('opn');
const markdown = require('markdown').markdown;
const files = require('../utils/files');

// TODO: automatically restart and display updated content when appropriate
// ie: when going to the next step

module.exports = function viewContent() {
  const app = express();
  const port = 8080;
  const content = files.readFile(`${process.cwd()}/ducktypecoder/content.md`);
  const htmlPage = markdown.toHTML(content); // TODO: add styling, maybe use templates

  app.use(express.static('./ducktypecoder/public'));

  files.changeIntoDirectory('./ducktypecoder');
  files.createDirectory('public');
  files.changeIntoDirectory('./public');
  files.createFile(`index.html`);
  files.writeToFile(`index.html`, htmlPage);

  app.listen(port, () => {
    console.log(`Serving content on port ${port}`);
  });

  opn(`http://localhost:${port}`);
};
