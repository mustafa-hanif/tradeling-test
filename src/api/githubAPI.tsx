const { Octokit } = require("@octokit/rest");
const octokit = new Octokit({
  log: {
    debug: console.log,
    info: console.log,
    warn: console.warn,
    error: console.error
  }
});

export const getRepos = async (q: String) => {
  const repos = await octokit.search.repos({
    q
  });
  return repos;
}

export const getUsers = async (q: String) => {
  const repos = await octokit.search.users({
    q
  });
  return repos;
}