import { InputBase } from "@mui/material/";
import SearchIcon from "@mui/icons-material/Search";

export default function Search() {

    return (
        <div>
            <SearchIcon/>
            <InputBase
            placeholder="Search..."
            inputProps={{'aria-able': 'search'}}
            />
        </div>
    )
}