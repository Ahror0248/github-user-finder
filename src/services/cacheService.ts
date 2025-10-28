import { GitHubUser, GitHubRepository } from "../types";

const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes

export const getCachedUser = (username: string): GitHubUser | null => {
  try {
    const cached = localStorage.getItem(`user_${username}`);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > CACHE_EXPIRY) {
      localStorage.removeItem(`user_${username}`);
      return null;
    }

    return data;
  } catch (error) {
    return null;
  }
};

export const setCachedUser = (username: string, data: GitHubUser): void => {
  try {
    localStorage.setItem(
      `user_${username}`,
      JSON.stringify({
        data,
        timestamp: Date.now(),
      })
    );
  } catch (error) {
    console.error("Failed to cache user data:", error);
  }
};

export const getCachedRepos = (username: string): GitHubRepository[] | null => {
  try {
    const cached = localStorage.getItem(`repos_${username}`);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > CACHE_EXPIRY) {
      localStorage.removeItem(`repos_${username}`);
      return null;
    }

    return data;
  } catch (error) {
    return null;
  }
};

export const setCachedRepos = (
  username: string,
  data: GitHubRepository[]
): void => {
  try {
    localStorage.setItem(
      `repos_${username}`,
      JSON.stringify({
        data,
        timestamp: Date.now(),
      })
    );
  } catch (error) {
    console.error("Failed to cache repos data:", error);
  }
};
