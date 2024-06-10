import { Box, Typography } from "@mui/material";
import { MexicoHomeBg } from "../assets";
import { CityTab } from "../components/cityTab.tsx";
import { useEffect, useState } from "react";
import { WeatherData } from "../types/Weatherdata.ts";
import { getCountry } from "../util/IWARequests.ts";
import { enqueueSnackbar } from "notistack";
import { isCountryOption } from "../types/CountryOptions.ts";
import { LineChart } from "@mui/x-charts";
import { groupByCity, groupByDateTime } from "../util/WDGroupBy.ts";

export const Country = () => {
    const queryParameters = new URLSearchParams(window.location.search);
    const country = queryParameters.get("country");

    const [cityData, setCityData] = useState<Map<string, WeatherData>>(new Map());
    const [timeData, setTimeData] = useState<Map<Date, WeatherData>>(new Map());

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

    const timeStamps = Array.from(timeData).map(time => time[0].getHours());

    return timeStamps.length > 0 && (
        <Box>
            <Box className={'logoBar'}>
                <Typography variant={'h1'}>{country}</Typography>
            </Box>
            <Box className={'countryGraphBox'}>
                <Box className={'countryGraphInclTitle'}>
                    <Typography variant="h4">
                        Average Temperature
                    </Typography>
                    <LineChart
                        title={"Average Temperature"}
                        xAxis={[{ data: [0, 1, 2, 3, 4, 5] }]}
                        series={[{ data: [1, 4, 1, 5, 2, 3] }]}
                    />
                </Box>
                <Box className={'countryGraphInclTitle'}>
                    <Typography variant="h4">
                        Average Wind Speed
                    </Typography>
                    <LineChart
                        title={"Average Wind Speed"}
                        xAxis={[{ data: [0, 1, 2, 3, 4, 5] }]}
                        series={[{ data: [1, 3, 5, 1, 4] }]}
                    />
                </Box>
                <Box className={'countryGraphInclTitle'}>
                    <Typography variant="h4">
                        Average Precipitation
                    </Typography>
                    <LineChart
                        title={"Average Precipitation"}
                        xAxis={[{ data: [0, 1, 2, 3, 4, 5] }]}
                        series={[{ data: [1, 3, 5, 1, 4] }]}
                    />
                </Box>
            </Box>
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