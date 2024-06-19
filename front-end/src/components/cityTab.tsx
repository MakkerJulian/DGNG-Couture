import { Box, Typography } from "@mui/material";
import { CloudIcon } from "../icons";
import { Clouds } from "../assets";
import '../css/cityCard.css';
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
                    <Typography>{temp}°</Typography>
                    <CloudIcon />
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
        </button>
    )
}