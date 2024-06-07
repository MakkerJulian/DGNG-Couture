import {Box, Typography} from "@mui/material";
import {MexicoHomeBg} from "../assets";
import {CityTab} from "../components/cityTab.tsx";
import {Graph} from "../components/graph.tsx";
import {useEffect, useState} from "react";
import {WeatherData} from "../types/Weatherdata.ts";
import {getCountry} from "../util/IWARequests.ts";
import {enqueueSnackbar} from "notistack";

export const Country = () => {
    const queryParameters = new URLSearchParams(window.location.search);
    const country = queryParameters.get("country");

    const [weatherstations, setWeatherStationData] = useState<WeatherData[]>([]);

    useEffect(() => {
        getCountry(country).then((data) => {
            setWeatherStationData(data);
        }).catch(() => {
            enqueueSnackbar("Could not get Weather data", { variant: 'error' })
        })
    }, []);

    return (
        <Box>
            <Box class={'logoBar'}>
                <Typography variant={'h1'}>{country}</Typography>
            </Box>
            <Box class={'countryGraphBox'}>
                <Graph data={[-2,-5,6,7, 15, 3]}/>
                <Graph data={[5,5,4,7, 4, 5, 7]}/>
                <Graph data={[-33,-5,-6,-7, -3, -25]}/>
                <Graph data={[15,53,30,7, 5, 1,24, 25, 12]}/>
            </Box>
            <Box class={'countryCityBox '}>
                {weatherstations.map((weatherstation, index) => (
                    <CityTab
                        city={weatherstation.weatherstation.name}
                        temp={weatherstation.temp}
                        bgImage={MexicoHomeBg}
                        feelTemp={weatherstation.temp}
                        wind={weatherstation.windspeed}
                        precip={weatherstation.precipitation}
                    ></CityTab>
                ))}
            </Box>
        </Box>
    );
}