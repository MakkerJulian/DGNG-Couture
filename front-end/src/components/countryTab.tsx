import {Box, Button, Typography} from "@mui/material";
import { CloudIcon } from "../icons";
import {useNavigate} from "react-router-dom";

type CountryTabProps = {
    country: string;
    temp: number;
    bgImage: string;
    feelTemp: number;
    wind: number;
    precip: number;
}
export const CountryTab = ({ country, temp, bgImage, feelTemp, wind, precip}: CountryTabProps) => {
    const navigate = useNavigate();
    return (
        <Box className="countryCard" sx={{ backgroundImage: `url(${bgImage})`}}>
            <Button sx={{position: "absolute", width: "45vw", height: "35vh"}} onClick={() => navigate("/country?country=" + country)}/>
            <Box className="countryCardText">
                <Typography variant={'h2'}>{country}</Typography>
                <Typography variant="h4">{temp}°</Typography>
                <CloudIcon />
            </Box>

            <Box className="countryCardText Right">
                <Typography variant='h6'>Feels like {feelTemp}</Typography>
                <Typography variant="h6">Wind {wind}km/h</Typography>
                <Typography variant="h6">Precip {precip}%</Typography>
            </Box>
        </Box>
    )
}