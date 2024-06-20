import { Box, Button, Typography } from "@mui/material";
import { Clouds } from "../assets";
import '../css/cityCard.css';
import { useNavigate } from "react-router-dom";
import * as Icons from "../icons";
import { WeatherData } from "../types/Weatherdata";

type CityTabProps = {
    city: string;
    temp: number;
    bgImage: string;
    feelTemp: number;
    onDownloadClick: () => void;
}

export const CityTab = ({ country, city, feelTemp, weatherData, onDownloadClick }: CityTabProps) => {
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
                    <Button variant="contained" onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.stopPropagation();
                        onDownloadClick();
                    }}>
                        Download Data
                    </Button>
                </Box>
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
    )
}