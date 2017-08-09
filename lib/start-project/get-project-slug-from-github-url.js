module.exports = function getProjectSlugFromGithub(projectIdentifier) {
  if (projectIdentifier.startsWith('git')) {
    return projectIdentifier.match(/([^/]+)\.git$/)[0].replace('.git', '');
  }

  if (projectIdentifier.startsWith('http')) {
    return projectIdentifier.match(/([^/]+$)/)[0];
  }

  throw new Error(
    "Whoops, I can't tell what the project's slug is based on the identifier: ",
    projectIdentifier
  );
};
