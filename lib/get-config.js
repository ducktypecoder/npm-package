module.exports = function getConfig(projectDirectory) {
  var config = require(projectDirectory.trim() + '/ducktypecoder');

  try {
    if (!config)
      throw new Error(
        "Whoops, there's something wrong with your ducktypecoder.js file."
      );
    if (!config.project)
      throw new Error(
        "Your ducktypecoder.js isn't exporting the project name, we need that to check your answers."
      );

    // TODO: also check that config.project matches a project we can test
    //  -- cannot have typos with that project name

    if (!config.token)
      throw new Error(
        "Your ducktypecoder.js isn't exporting your token, we won't know who is submitting this answer."
      );

    console.log('ducktypecoder.js looks good!');

    config.projectDirectory = projectDirectory;
    return config;
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
};
