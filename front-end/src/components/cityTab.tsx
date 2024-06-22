import { Box, Typography } from "@mui/material";
import {Clouds, Cloudy, Freezing, Sunny, Thunder, Tornado} from "../assets";
import '../css/cityCard.css';
import { useNavigate } from "react-router-dom";
import * as Icons from "../icons";
import { WeatherData } from "../types/Weatherdata";

type CityTabProps = {
    city: string;
    temp: number;
    country: string;
    weatherData: WeatherData;
    feelTemp: number;
}

export const CityTab = ({ country, city, feelTemp, weatherData }: CityTabProps) => {
    const navigate = useNavigate();
    let image = Sunny;

    if (weatherData.clouds > 50) {
        image = Cloudy;
    } if (weatherData.freezing || weatherData.snow) {
        image = Freezing;
    } if (weatherData.thunder) {
        image = Thunder;
    } if (weatherData.tornado) {
        image = Tornado;
    }

    return (

        <button className="cityButton" onClick={() => navigate(`/city?city=${city}&country=${country}`)}>
            <Box className="cityCard" sx={{ backgroundImage: `url(${image})` }}>
                <Box className="cityCardText">
                    <Typography>{weatherData.temp}°</Typography>
                    {weatherData.clouds > 50 && <Icons.CloudIcon />}
                    {weatherData.freezing && <Icons.AcUnitIcon />}
                    {weatherData.rain && <Icons.WaterDropIcon />}
                    {weatherData.snow && <Icons.SevereColdIcon />}
                    {weatherData.hail && <Icons.StormIcon />}
                    {weatherData.thunder && <Icons.ThunderstormIcon />}
                    {weatherData.tornado && <Icons.TornadoIcon />}
                </Box>


                <Box className="cityCardName">
                    <Typography>{city}</Typography>
                </Box>

                <Box className="cityCardTextInfo">
                    <Typography>Feels like {feelTemp}</Typography>
                    <Typography>Wind {weatherData.windspeed}km/h</Typography>
                    <Typography>Precip {weatherData.precipitation}%</Typography>
                </Box>
            </Box>
        </button>

    );
}