import React from "react";
import { Container, Box, AppBar, Toolbar, Typography } from "@mui/material";
import { GitHubProvider, useGitHub } from "./context/GitHubContext";
import { ThemeModeProvider } from "./context/ThemeContext";
import SearchBar from "./components/SearchBar";
import UserProfile from "./components/UserProfile";
import Repositories from "./components/Repositories";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorAlert from "./components/ErrorAlert";
import ThemeToggle from "./components/ThemeToggle";

const AppContent: React.FC = () => {
  const { userData, repos, loading, error } = useGitHub();

  return (
    <>
      <AppBar position="static" elevation={2}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            GitHub User Finder
          </Typography>
          <ThemeToggle />
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <SearchBar />

        {loading && !userData && <LoadingSpinner />}

        {error && <ErrorAlert message={error} />}

        {userData && !error && (
          <Box>
            <UserProfile user={userData} />
            <Repositories repos={repos} />
          </Box>
        )}

        {!userData && !loading && !error && (
          <Box textAlign="center" py={8}>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              Search for a GitHub User
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Enter a username above to get started
            </Typography>
          </Box>
        )}
      </Container>
    </>
  );
};

function App() {
  return (
    <ThemeModeProvider>
      <GitHubProvider>
        <AppContent />
      </GitHubProvider>
    </ThemeModeProvider>
  );
}

export default App;
