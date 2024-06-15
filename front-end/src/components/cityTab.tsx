import { Box, Typography } from "@mui/material";
import { CloudIcon } from "../icons";
import { Clouds } from "../assets";
import { useNavigate } from "react-router-dom";

type CityTabProps = {
    city: string;
    temp: number;
    country: string;
    feelTemp: number;
    wind: number;
    precip: number;
}

export const CityTab = ({ city, temp, country, feelTemp, wind, precip }: CityTabProps) => {
    const navigate = useNavigate(); 
    return (
        <button className="cityButton" onClick={() => navigate(`/city?city=${city}&country=${country}`)}>
            <Box className="cityCard" sx={{ backgroundImage: `url(${Clouds})` }}>
                <Box className="cityCardText">
                    <Typography variant="h4">{temp}°</Typography>
                    <CloudIcon />
                </Box>

                <Box className="cityCardTextInfo">
                    <Typography variant='h6'>Feels like {feelTemp}</Typography>
                    <Typography variant="h6">Wind {wind}km/h</Typography>
                    <Typography variant="h6">Precip {precip}%</Typography>
                </Box>

                <Box className="cityCardName">
                    <Typography variant={'h4'}>{city}</Typography>
                </Box>

            </Box>
        </button>
    )
}