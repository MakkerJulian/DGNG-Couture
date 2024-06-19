import { Box, Typography } from "@mui/material";
import { CloudIcon } from "../icons";
import { Clouds } from "../assets";
import '../css/cityCard.css';
import { useNavigate } from "react-router-dom";
import * as Icons from "../icons";

type CityTabProps = {
    city: string;
    temp: number;
    country: string;
    feelTemp: number;
    wind: number;
    precip: number;
    clouds: number;
    freezing: boolean;
    rain: boolean;
    snow: boolean;
    hail: boolean;
    thunder: boolean;
    tornado: boolean;
}

export const CityTab = ({ country, city, temp, feelTemp, wind, precip, clouds, freezing, rain, snow, hail, thunder, tornado }: CityTabProps) => {
    const navigate = useNavigate();
    return (

        <button className="cityButton" onClick={() => navigate(`/city?city=${city}&country=${country}`)}>
            <Box className="cityCard" sx={{ backgroundImage: `url(${Clouds})` }}>
                <Box className="cityCardText">
                    <Typography>{temp}°</Typography>
                    <CloudIcon />
                </Box>
                <Box className="cityCard" sx={{ backgroundImage: `url(${Clouds})` }}>
                    <Box className="cityCardText">
                        <Typography>{temp}°</Typography>
                        {clouds > 50 && <Icons.CloudIcon />}
                        {freezing && <Icons.AcUnitIcon />}
                        {rain && <Icons.WaterDropIcon />}
                        {snow && <Icons.SevereColdIcon />}
                        {hail && <Icons.StormIcon />}
                        {thunder && <Icons.ThunderstormIcon />}
                        {tornado && <Icons.TornadoIcon />}
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
            </Box>
        </button>

    );
}