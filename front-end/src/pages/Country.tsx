import {Box, Typography} from "@mui/material";
import {MexicoHomeBg} from "../assets";
import {CityTab} from "../components/cityTab.tsx";
import {Graph} from "../components/graph.tsx";
import {useEffect, useState} from "react";
import {WeatherData} from "../types/Weatherdata.ts";
import {getCountry} from "../util/IWARequests.ts";
import {enqueueSnackbar} from "notistack";
import {calculateAveragePerCountry} from "../util/averagePerCountryCalc.ts";

export const Country = () => {
    const queryParameters = new URLSearchParams(window.location.search);
    const country = queryParameters.get("country");

    const [weatherstations, setWeatherStationData] = useState<WeatherData[]>([]);
    const averageData = calculateAveragePerCountry(weatherstations);

    const [graphTemp, setGraphTemp] = useState<number[]>([]);
    const [graphPrecip, setGraphPrecip] = useState<number[]>([]);
    const [graphWind, setGraphWind] = useState<number[]>([]);
    const [graphFeeltemp, setGraphFeeltemp] = useState<number[]>([]);

    useEffect(() => {
        getCountry(country).then((data) => {
            setWeatherStationData(data);
        }).catch(() => {
            enqueueSnackbar("Could not get Weather data", { variant: 'error' })
        })

        addToGraphData();

        const updateGraph = setInterval(addToGraphData, 2500);
        return () => clearInterval(updateGraph);
    }, []);

    function addToGraphData() {
        const averageData = calculateAveragePerCountry(weatherstations);

        setGraphTemp(prev => [...prev, 0]);
        setGraphPrecip(prev => [...prev, averageData.precip]);
        setGraphWind(prev => [...prev, averageData.wind]);
        setGraphFeeltemp(prev => [...prev, averageData.feelTemp]);

        console.log("Done");
    }




    return (
        <Box>
            <Box className={'logoBar'}>
                <Typography variant={'h1'}>{country}</Typography>
            </Box>
            <Box className={'countryGraphBox'}>
                <Graph data={graphTemp} name={"Average Temperature"}/>
                <Graph data={graphPrecip} name={"Average Precipitation"}/>
                <Graph data={graphWind} name={"Average Windspeed"}/>
                <Graph data={graphFeeltemp} name={"Average Temp Feel"}/>
            </Box>
            <Box className={'countryCityBox '}>
                {weatherstations.map((weatherstation, index) => (
                    <CityTab
                        city={"ID: "+weatherstation.id}
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