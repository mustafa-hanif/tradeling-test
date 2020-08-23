const { Octokit } = require("@octokit/rest");
const octokit = new Octokit({
  log: {
    debug: console.log,
    info: console.log,
    warn: console.warn,
    error: console.error
  }
});

export interface RepoDetails {
  id: number
  name: string
  full_name: string
  open_issues_count: number
}

export const getRepos = async (q: String) => {
  const repos = await octokit.search.repos({
    q
  });
  return repos;
}