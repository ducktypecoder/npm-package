module.exports = function getConfig(projectDirectory) {
  console.log('validating your ducktypecoder config...');

  try {
    const config = require(`${projectDirectory.trim()}/ducktypecoder`);

    if (!config)
      throw new Error(
        "Whoops, there's something wrong with your config.json file."
      );
    if (!config.project)
      throw new Error('Your ducktypecoder.json seems to have issues.');

    // TODO: also check that config.project matches a project we can test
    //  -- cannot have typos with that project name

    // TODO: token? not required unless using web api
    if (!config.token)
      // throw new Error(
      //   "Your ducktypecoder.js isn't exporting your token, we won't know who is submitting this answer."
      // );

      config.projectDirectory = projectDirectory;
    // TODO: SSL on heroku
    config.apiUrl = config.development
      ? 'http://localhost:3000/api'
      : 'http://ducktypecoder.herokuapp.com/api';

    return config;
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
};
