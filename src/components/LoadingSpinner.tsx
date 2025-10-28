import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const LoadingSpinner: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={5}
    >
      <CircularProgress size={60} />
      <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
        Loading...
      </Typography>
    </Box>
  );
};

export default LoadingSpinner;
