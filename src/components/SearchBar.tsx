import React, { useState, useCallback } from "react";
import {
  Box,
  TextField,
  IconButton,
  InputAdornment,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useGitHub } from "../context/GitHubContext";
import { debounce } from "lodash";

const SearchBar: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const { searchUser, loading, clearData } = useGitHub();

  const debouncedSearch = useCallback(
    debounce((username: string) => {
      if (username.trim()) {
        searchUser(username);
      }
    }, 500),
    [searchUser]
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    if (!value.trim()) {
      clearData();
    } else {
      debouncedSearch(value);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim() && !loading) {
      searchUser(inputValue.trim());
    }
  };

  return (
    <Paper elevation={3} sx={{ mb: 3 }}>
      <Box p={3}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Enter GitHub username..."
          value={inputValue}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          disabled={loading}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton disabled>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "primary.main",
              },
            },
          }}
        />
      </Box>
    </Paper>
  );
};

export default SearchBar;
