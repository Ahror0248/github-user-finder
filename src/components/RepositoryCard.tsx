import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Link,
  IconButton,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ForkRightIcon from "@mui/icons-material/ForkRight";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { GitHubRepository } from "../types";

interface RepositoryCardProps {
  repo: GitHubRepository;
}

const RepositoryCard: React.FC<RepositoryCardProps> = ({ repo }) => {
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <Card
      elevation={2}
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="start"
          mb={1}
        >
          <Typography variant="h6" component="h3" sx={{ fontWeight: "bold" }}>
            {repo.name}
          </Typography>
          <IconButton
            size="small"
            component={Link}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <OpenInNewIcon fontSize="small" />
          </IconButton>
        </Box>

        {repo.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {repo.description}
          </Typography>
        )}

        <Box display="flex" flexWrap="wrap" gap={1} mt="auto">
          <Chip
            icon={<StarIcon />}
            label={repo.stargazers_count}
            size="small"
            variant="outlined"
          />
          <Chip
            icon={<ForkRightIcon />}
            label={repo.forks_count}
            size="small"
            variant="outlined"
          />
          {repo.language && (
            <Chip
              label={repo.language}
              size="small"
              color="primary"
              variant="outlined"
            />
          )}
        </Box>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mt: 1 }}
        >
          Updated {formatDate(repo.updated_at)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RepositoryCard;
