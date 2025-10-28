import axios from "axios";
import { GitHubUser, GitHubRepository } from "../types";

const GITHUB_API_BASE = "https://api.github.com";

export const fetchUser = async (username: string): Promise<GitHubUser> => {
  try {
    const response = await axios.get<GitHubUser>(
      `${GITHUB_API_BASE}/users/${username}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("User not found");
      }
      throw new Error(error.message);
    }
    throw new Error("An unexpected error occurred");
  }
};

export const fetchRepos = async (
  username: string,
  page: number = 1,
  perPage: number = 30
): Promise<GitHubRepository[]> => {
  try {
    const response = await axios.get<GitHubRepository[]>(
      `${GITHUB_API_BASE}/users/${username}/repos?sort=updated&page=${page}&per_page=${perPage}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    }
    throw new Error("An unexpected error occurred");
  }
};
