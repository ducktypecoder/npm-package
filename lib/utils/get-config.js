module.exports = function getConfig() {
  const config = require(`${process.cwd()}/ducktypecoder/config.json`);

  if (!config) {
    throw new Error(
      "Whoops, there's something wrong with your config.json file."
    );
  }

  // if (!config.projectName)
  // throw new Error('Your ducktypecoder.json should have a project name.');

  // TODO: also check that config.project matches a project we can test
  //  -- cannot have typos with that project name

  // TODO: token? not required unless using web api
  // if (!config.token)
  // throw new Error(
  //   "Your ducktypecoder.js isn't exporting your token, we won't know who is submitting this answer."
  // );
  // TODO: SSL on heroku

  return config;
};
