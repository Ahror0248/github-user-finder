import React from "react";
import { Alert, AlertTitle, Paper } from "@mui/material";

interface ErrorAlertProps {
  message: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => {
  return (
    <Paper elevation={3} sx={{ mb: 3 }}>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {message}
      </Alert>
    </Paper>
  );
};

export default ErrorAlert;
