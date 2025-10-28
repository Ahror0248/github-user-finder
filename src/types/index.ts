export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  company: string | null;
  location: string | null;
  blog: string | null;
  created_at: string;
}

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

export interface AppState {
  userData: GitHubUser | null;
  repos: GitHubRepository[];
  loading: boolean;
  loadingMore: boolean;
  hasMore: boolean;
  page: number;
  error: string | null;
  username: string;
}

export interface GitHubContextType extends AppState {
  searchUser: (username: string) => Promise<void>;
  loadMoreRepos: () => Promise<void>;
  clearData: () => void;
}
