import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";
import {
  AppState,
  GitHubContextType,
  GitHubUser,
  GitHubRepository,
} from "../types";
import { fetchUser, fetchRepos } from "../services/githubService";
import { getCachedUser, setCachedUser } from "../services/cacheService";

type Action =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_LOADING_MORE"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_USER"; payload: GitHubUser | null }
  | { type: "SET_REPOS"; payload: GitHubRepository[] }
  | { type: "ADD_REPOS"; payload: GitHubRepository[] }
  | { type: "SET_HAS_MORE"; payload: boolean }
  | { type: "SET_PAGE"; payload: number }
  | { type: "SET_USERNAME"; payload: string }
  | { type: "CLEAR_DATA" };

const initialState: AppState = {
  userData: null,
  repos: [],
  loading: false,
  loadingMore: false,
  hasMore: false,
  page: 1,
  error: null,
  username: "",
};

function githubReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_LOADING_MORE":
      return { ...state, loadingMore: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_USER":
      return { ...state, userData: action.payload };
    case "SET_REPOS":
      return { ...state, repos: action.payload, page: 1 };
    case "ADD_REPOS":
      return { ...state, repos: [...state.repos, ...action.payload] };
    case "SET_HAS_MORE":
      return { ...state, hasMore: action.payload };
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    case "CLEAR_DATA":
      return initialState;
    default:
      return state;
  }
}

const GitHubContext = createContext<GitHubContextType | undefined>(undefined);

export const GitHubProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(githubReducer, initialState);

  const searchUser = useCallback(async (username: string) => {
    if (!username.trim()) {
      dispatch({ type: "SET_ERROR", payload: "Please enter a username" });
      return;
    }

    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_ERROR", payload: null });
    dispatch({ type: "SET_USERNAME", payload: username });
    dispatch({ type: "SET_PAGE", payload: 1 });

    try {
      const cachedUser = getCachedUser(username);
      let userData: GitHubUser;

      if (cachedUser) {
        userData = cachedUser;
        dispatch({ type: "SET_USER", payload: userData });
      } else {
        userData = await fetchUser(username);
        dispatch({ type: "SET_USER", payload: userData });
        setCachedUser(username, userData);
      }

      const repos = await fetchRepos(username, 1, 30);
      dispatch({ type: "SET_REPOS", payload: repos });
      dispatch({ type: "SET_HAS_MORE", payload: repos.length === 30 });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload:
          error instanceof Error ? error.message : "Failed to fetch user data",
      });
      dispatch({ type: "SET_USER", payload: null });
      dispatch({ type: "SET_REPOS", payload: [] });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  const loadMoreRepos = useCallback(async () => {
    if (state.loadingMore || !state.hasMore) return;

    dispatch({ type: "SET_LOADING_MORE", payload: true });

    try {
      const nextPage = state.page + 1;
      const repos = await fetchRepos(state.username, nextPage, 30);

      dispatch({ type: "ADD_REPOS", payload: repos });
      dispatch({ type: "SET_PAGE", payload: nextPage });
      dispatch({ type: "SET_HAS_MORE", payload: repos.length === 30 });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload:
          error instanceof Error ? error.message : "Failed to load more repos",
      });
    } finally {
      dispatch({ type: "SET_LOADING_MORE", payload: false });
    }
  }, [state.loadingMore, state.hasMore, state.page, state.username]);

  const clearData = useCallback(() => {
    dispatch({ type: "CLEAR_DATA" });
  }, []);

  const value: GitHubContextType = {
    ...state,
    searchUser,
    loadMoreRepos,
    clearData,
  };

  return (
    <GitHubContext.Provider value={value}>{children}</GitHubContext.Provider>
  );
};

export const useGitHub = () => {
  const context = useContext(GitHubContext);
  if (context === undefined) {
    throw new Error("useGitHub must be used within a GitHubProvider");
  }
  return context;
};
