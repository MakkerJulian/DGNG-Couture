import { Cloudy, Freezing, Sunny, Thunder, Tornado } from "../assets";
import { Box, Button, Typography } from "@mui/material";
import '../css/cityCard.css';
import { useNavigate } from "react-router-dom";
import * as Icons from "../icons";
import { WeatherData } from "../types/Weatherdata";
import { getName } from "../util/WDGroupBy";

type CityTabProps = {
    city: string;
    country: string;
    weatherData: WeatherData;
    onDownloadClick: () => void;
}

export const CityTab = ({ country, city, weatherData, onDownloadClick }: CityTabProps) => {
    const navigate = useNavigate();
    let image = Sunny;

    if (weatherData.tornado) {
        image = Tornado;
    }
    else if (weatherData.thunder) {
        image = Thunder;
    }
    else if (weatherData.freezing || weatherData.snow) {
        image = Freezing;
    }
    else if (weatherData.clouds > 50) {
        image = Cloudy;
    }

    const name = getName(weatherData);

    return (
        <Box 
        className="cityCard" 
        onClick={() => navigate(`/city?city=${city}&country=${country}`)}>
            
            <img loading="lazy" src={image} alt="weather" className="image" />
            
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
                <Typography>{name}</Typography>
            </Box>

            <Box className="cityCardTextInfo">
                <Typography>Wind {weatherData.windspeed}km/h</Typography>
                <Typography>Precip {weatherData.precipitation}%</Typography>
                <Button variant="contained" onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    onDownloadClick();
                }}>
                    Download Data
                </Button>
            </Box>
        </Box>
    );
}