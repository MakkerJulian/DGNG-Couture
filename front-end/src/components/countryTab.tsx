import { Box, Typography } from "@mui/material";
import { CloudIcon } from "../icons";

type CountryTabProps = {
    country: string;
    temp: number;
    bgImage: string;
    feelTemp: number;
    humidity: number;
    wind: number;
    precip: number;
}
export const CountryTab = ({ country, temp, bgImage, feelTemp, humidity, wind, precip}: CountryTabProps) => {
    return (
        <Box className="countryCard" sx={{ backgroundImage: `url(${bgImage})` }}>
            <Box className="countryCardText">
                <Typography variant={'h2'}>{country}</Typography>
                <Typography variant="h4">{temp}°</Typography>
                <CloudIcon />
            </Box>

            <Box className="countryCardText Right">
                <Typography variant='h6'>Feels like {feelTemp}</Typography>
                <Typography variant="h6">Humidity {humidity}%</Typography>
                <Typography variant="h6">Wind {wind}km/h</Typography>
                <Typography variant="h6">Precip {precip}%</Typography>
            </Box>
        </Box>
    )
}