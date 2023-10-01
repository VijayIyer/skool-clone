import {
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
  InputBase,
} from "@mui/material/";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import style from "./search.module.css";

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
    <div className={`${style.navbar_search}`}>
      <FormControl className={`${style.navbar_search_form}`}>
        <InputBase
          className={`${style.navbar_search_feild}`}
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon className={`${style.navbar_searchIcon}`} />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end" className={`${style.navbar_crossIcon}`}>{renderCloseIcon()}</InputAdornment>
          }
        />
      </FormControl>
    </div>
  );
}
