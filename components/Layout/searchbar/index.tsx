import {
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material/";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

export default function Search() {
  const [searchToken, setSearchToken] = useState<string | null>(null);
  function handleChange() {}
  return (
    <FormControl sx={{ flexGrow: "1" }}>
      <TextField
        variant="outlined"
        placeholder="Search..."
        inputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
                <CloseIcon />
            </InputAdornment>
          ),
        }}
        onChange={handleChange}
      />
    </FormControl>
  );
}
