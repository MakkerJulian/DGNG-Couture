import { Box, Typography } from "@mui/material";
import { Clouds } from "../assets";
import '../css/cityCard.css';
import { useNavigate } from "react-router-dom";
import * as Icons from "../icons";
import { WeatherData } from "../types/Weatherdata";
import { getName } from "../util/WDGroupBy";

type CityTabProps = {
    city: string;
    temp: number;
    country: string;
    weatherData: WeatherData;
    feelTemp: number;
}

export const CityTab = ({ country, city, feelTemp, weatherData }: CityTabProps) => {
    const navigate = useNavigate();
    return (

        <button className="cityButton" onClick={() => navigate(`/city?city=${city}&country=${country}`)}>
                <Box className="cityCard" sx={{ backgroundImage: `url(${Clouds})` }}>
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
        <Box className="cityCard" sx={{ backgroundImage: `url(${image})` }} onClick={
            () => navigate(`/city?city=${city}&country=${country}`)}>
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