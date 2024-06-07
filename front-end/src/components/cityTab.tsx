import {Box, Typography} from "@mui/material";
import {CloudIcon} from "../icons";
import {Clouds} from "../assets";

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
                <Typography variant="h4">{temp}°</Typography>
                <CloudIcon/>
            </Box>

            <Box className="cityCardTextInfo">
                <Typography variant='h6'>Feels like {feelTemp}</Typography>
                <Typography variant="h6">Wind {wind}km/h</Typography>
                <Typography variant="h6">Precip {precip}%</Typography>
            </Box>

            <Box className="cityCardName">
                <Typography variant={'h2'}>- {city} -</Typography>
            </Box>

        </Box>
    )
}