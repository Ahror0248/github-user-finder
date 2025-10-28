import React from "react";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
  Chip,
  Link,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import LinkIcon from "@mui/icons-material/Link";
import PeopleIcon from "@mui/icons-material/People";

interface UserProfileProps {
  user: {
    login: string;
    name: string | null;
    avatar_url: string;
    bio: string | null;
    public_repos: number;
    followers: number;
    following: number;
    location: string | null;
    company: string | null;
    blog: string | null;
    html_url: string;
  };
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <Card elevation={3} sx={{ mb: 3 }}>
      <CardContent>
        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={3}>
          <Box display="flex" justifyContent="center">
            <Avatar
              src={user.avatar_url}
              alt={user.login}
              sx={{ width: { xs: 120, sm: 150 }, height: { xs: 120, sm: 150 } }}
            />
          </Box>

          <Box flex={1}>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <Typography variant="h4" component="h1">
                {user.name || user.login}
              </Typography>
            </Box>

            {user.name && (
              <Typography variant="body1" color="text.secondary" gutterBottom>
                @{user.login}
              </Typography>
            )}

            {user.bio && (
              <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
                {user.bio}
              </Typography>
            )}

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                mt: 1,
              }}
            >
              <Chip
                icon={<BusinessIcon />}
                label={`${user.public_repos} Repositories`}
                variant="outlined"
              />
              <Chip
                icon={<PeopleIcon />}
                label={`${user.followers} Followers`}
                variant="outlined"
              />
              <Chip
                icon={<PeopleIcon />}
                label={`${user.following} Following`}
                variant="outlined"
              />
            </Box>

            {(user.location || user.company || user.blog) && (
              <Box mt={2}>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  Contact Information
                </Typography>
                {user.location && (
                  <Box display="flex" alignItems="center" gap={0.5} mt={0.5}>
                    <LocationOnIcon fontSize="small" />
                    <Typography variant="body2">{user.location}</Typography>
                  </Box>
                )}
                {user.company && (
                  <Box display="flex" alignItems="center" gap={0.5} mt={0.5}>
                    <BusinessIcon fontSize="small" />
                    <Typography variant="body2">{user.company}</Typography>
                  </Box>
                )}
                {user.blog && (
                  <Box display="flex" alignItems="center" gap={0.5} mt={0.5}>
                    <LinkIcon fontSize="small" />
                    <Link
                      href={user.blog}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {user.blog}
                    </Link>
                  </Box>
                )}
              </Box>
            )}

            <Box mt={3}>
              <Link
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
              >
                View on GitHub
                <OpenInNewIcon sx={{ ml: 0.5, fontSize: 16 }} />
              </Link>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
