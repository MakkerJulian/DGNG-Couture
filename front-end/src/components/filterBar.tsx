import {Box, Button, MenuItem, Select, TextField, Typography} from "@mui/material";
import '../css/filterBar.css';

export const FilterBar = () => {
    return (
        <Box className={"filterBar"}>
            <Typography className={"filterTitle"}>Filters</Typography>
            <TextField className={"filterInput"} placeholder={"ID"}></TextField>
            <TextField className={"filterInput"} placeholder={"City"}></TextField>
            <TextField className={"filterInput"} placeholder={"Temp"}></TextField>
            <TextField className={"filterInput"} placeholder={"Precip"}></TextField>
            <Select placeholder={"Conditions"} className={"filterDropDown"}>
                <MenuItem>Tornado</MenuItem>
                <MenuItem>Storm</MenuItem>
                <MenuItem>Hail</MenuItem>
                <MenuItem>Snow</MenuItem>
            </Select>
            <Button className={"filterButton"}>Filter</Button>
        </Box>
    )
}