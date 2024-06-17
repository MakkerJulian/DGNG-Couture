import {Box, Typography} from "@mui/material";
import {CloudIcon} from "../icons";
import {Clouds} from "../assets";
import '../css/cityCard.css';

type CityTabProps = {
    city: string;
    temp: number;
    bgImage: string;
    feelTemp: number;
    wind: number;
    precip: number;
}

export const CityTab = ({ city, temp, bgImage, feelTemp, wind, precip }: CityTabProps) => {
    return (
        <Box className="cityCard" sx={{ backgroundImage: `url(${Clouds})` }}>
            <Box className="cityCardText">
                <Typography>{temp}°</Typography>
                <CloudIcon/>
            </Box>


            <Box className="cityCardName">
                <Typography>{city}</Typography>
            </Box>

            <Box className="cityCardTextInfo">
                <Typography>Feels like {feelTemp}</Typography>
                <Typography>Wind {wind}km/h</Typography>
                <Typography>Precip {precip}%</Typography>
            </Box>
        </Box>
    )
}