import { Box, Typography } from "@mui/material";
import { MexicoHomeBg } from "../assets";
import { CityTab } from "../components/cityTab.tsx";
import { useEffect, useState } from "react";
import { WeatherData } from "../types/Weatherdata.ts";
import { getCountry } from "../util/IWARequests.ts";
import { enqueueSnackbar } from "notistack";
import { isCountryOption } from "../types/CountryOptions.ts";
import { groupByCity, groupByDateTime } from "../util/WDGroupBy.ts";
import { LogoBar } from "../components/topbar.tsx";
import '../css/country.css'
import { DateGraph } from "../components/DateGraph.tsx";

export const Country = () => {
    const queryParameters = new URLSearchParams(window.location.search);
    const country = queryParameters.get("country") ?? "";

    const [cityData, setCityData] = useState<Map<string, WeatherData>>(new Map());
    const [timeData, setTimeData] = useState<Map<string, WeatherData>>(new Map());

    useEffect(() => {
        if (country && isCountryOption(country)) {
            getCountry(country).then((data) => {
                if (data) {
                    setCityData(groupByCity(data));
                    setTimeData(groupByDateTime(data));
                }
            }).catch(() => {
                enqueueSnackbar("Could not get Weather data", { variant: 'error' })
            })
        }
    }, [country]);

    const timeStamps = Array.from(timeData).map(time => new Date(time[0]));
    const temps = Array.from(timeData).map(time => time[1].temp);
    const windspeeds = Array.from(timeData).map(time => time[1].windspeed);
    const precipitations = Array.from(timeData).map(time => time[1].precipitation);
    const airpressures = Array.from(timeData).map(time => time[1].s_airpressure);

    return (
        <Box>
            <LogoBar title={country} backbutton />
            {timeStamps.length > 0 && <Box className={'countryGraphBox'}>
                <Box className={'countryGraphInclTitle'}>
                    <Typography variant="h4">
                        Average Temperature
                    </Typography>
                    <DateGraph  timeStamps={timeStamps} data={temps} yAxisLabel="Temperature" />
                </Box>
                <Box className={'countryGraphInclTitle'}>
                    <Typography variant="h4">
                        Average Wind Speed
                    </Typography>
                    <DateGraph  timeStamps={timeStamps} data={windspeeds} yAxisLabel="Wind Speed" />
                </Box>
                <Box className={'countryGraphInclTitle'}>
                    <Typography variant="h4">
                        Average Precipitation
                    </Typography>
                    <DateGraph  timeStamps={timeStamps} data={precipitations} yAxisLabel="Precipitation" />
                </Box>
                <Box className={'countryGraphInclTitle'}>
                    <Typography variant="h4">
                        Average Air Pressure
                    </Typography>
                    <DateGraph  timeStamps={timeStamps} data={airpressures} yAxisLabel="Airpressure" />
                </Box>
            </Box>}
            <Box className={'countryCityBox '}>
                {Array.from(cityData).map((data) => {
                    const weatherData = data[1];
                    return (
                        <CityTab
                            key={data[0]}
                            city={data[0]}
                            temp={weatherData.temp}
                            bgImage={MexicoHomeBg}
                            feelTemp={weatherData.temp}
                            wind={weatherData.windspeed}
                            precip={weatherData.precipitation}
                        ></CityTab>
                    );
                })}
            </Box>
        </Box>
    );
}