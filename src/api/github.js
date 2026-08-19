import axios from "axios";

const githubAPI = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github+json",
  },
});

export const getUser = async (username) => {
  return githubAPI.get(`/users/${username}`);
};

export const getRepos = async (username) => {
  return githubAPI.get(`/users/${username}/repos?sort=updated&per_page=100`);
};

export const getRepoLanguages = (repos) => {
  const languages = {};

  repos.forEach((repo) => {
    if (!repo.language) return;

    languages[repo.language] = (languages[repo.language] || 0) + 1;
  });

  return languages;
};
