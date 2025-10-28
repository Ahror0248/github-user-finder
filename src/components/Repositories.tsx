import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Tabs,
  Tab,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import RepositoryCard from "./RepositoryCard";
import { useGitHub } from "../context/GitHubContext";
import { GitHubRepository } from "../types";

interface RepositoriesProps {
  repos: GitHubRepository[];
  loading?: boolean;
}

const Repositories: React.FC<RepositoriesProps> = ({ repos, loading }) => {
  const [sortBy, setSortBy] = useState<"name" | "stars" | "updated">("updated");
  const { loadMoreRepos, loadingMore, hasMore } = useGitHub();
  const observerTarget = useRef<HTMLDivElement>(null);

  const sortedRepos = [...repos].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "stars":
        return b.stargazers_count - a.stargazers_count;
      case "updated":
        return (
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
      default:
        return 0;
    }
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore && !loading) {
          loadMoreRepos();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loadingMore, loading, loadMoreRepos]);

  if (loading) {
    return (
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography>Loading repositories...</Typography>
      </Paper>
    );
  }

  if (repos.length === 0) {
    return (
      <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="body1" color="text.secondary">
          No repositories found
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={3}>
      <Box borderBottom={1} borderColor="divider">
        <Tabs value={sortBy} onChange={(_, value) => setSortBy(value)}>
          <Tab label="Recently Updated" value="updated" />
          <Tab label="Most Stars" value="stars" />
          <Tab label="Name" value="name" />
        </Tabs>
      </Box>

      <Box p={3}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {repos.length} repositories
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 2,
            mt: 1,
          }}
        >
          {sortedRepos.map((repo) => (
            <RepositoryCard repo={repo} key={repo.id} />
          ))}
        </Box>

        {hasMore && (
          <Box
            ref={observerTarget}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              py: 3,
              mt: 2,
            }}
          >
            {loadingMore && <CircularProgress size={40} />}
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default Repositories;
