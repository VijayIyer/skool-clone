import {
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material/";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import style from "@/styles/Navbar.module.css";

export default function Search() {
  const [searchValue, setSearchValue] = useState<string>("");

  function renderCloseIcon() {
    if (searchValue !== "") {
      return (
        <InputAdornment position="end">
          <IconButton onClick={handleCancleSearch}>
            <CloseIcon />
          </IconButton>
        </InputAdornment>
      );
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value);
  }

  function handleCancleSearch() {
    setSearchValue("");
  }

  return (
    <FormControl className={`${style.navbar_search}`}>
      <TextField
        variant="outlined"
        type="text"
        placeholder="Search..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: <>{renderCloseIcon()}</>,
        }}
        value={searchValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
      />
    </FormControl>
  );
}
