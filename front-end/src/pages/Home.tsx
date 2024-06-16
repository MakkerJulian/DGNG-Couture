import { Box } from "@mui/material";
import { AlaskaHomeBg, AmericaHomeBg, FranceHomeBg, FinlandHomeBg, GreenlandHomeBg, MexicoHomeBg, NorwayHomeBg, SpainHomeBg } from "../assets";
import '../css/home.css'
import { getRole } from "../util/getrole";
import React, { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { calculateAveragePerCountry } from "../util/averagePerCountryCalc";
import { getCountry } from "../util/IWARequests";
import { WeatherData } from "../types/Weatherdata";
import { LogoBar } from "../components/topbar";

const LazyCountryTab = React.lazy(() => import("../components/countryTab"));

export const Home = () => {
    const role = getRole();

    const [mexicoData, setMexicoData] = useState<WeatherData[]>([]);
    const [franceData, setFranceData] = useState<WeatherData[]>([]);
    const [americaData, setAmericaData] = useState<WeatherData[]>([]);
    const [spainData, setSpainData] = useState<WeatherData[]>([]);

    const [greenlandData, setGreenlandData] = useState<WeatherData[]>([]);
    const [norwayData, setNorwayData] = useState<WeatherData[]>([]);
    const [alaskaData, setAlaskaData] = useState<WeatherData[]>([]);
    const [finlandData, setFinlandData] = useState<WeatherData[]>([]);

    useEffect(() => {
        if (role === 'sales') {
            getCountry('Spain').then((data) => {
                setSpainData(data);
            }).catch(() => {
                enqueueSnackbar("Could not get Spain Weather data", { variant: 'error' })
            });
            getCountry('Mexico').then((data) => {
                setMexicoData(data);
            }).catch(() => {
                enqueueSnackbar("Could not get Mexico Weather data", { variant: 'error' })
            });
            getCountry('France').then((data) => {
                setFranceData(data);
            }).catch(() => {
                enqueueSnackbar("Could not get France Weather data", { variant: 'error' })
            });
            getCountry('United States').then((data) => {
                setAmericaData(data);
            }).catch(() => {
                enqueueSnackbar("Could not get America Weather data", { variant: 'error' })
            });
        } else {
            getCountry('Greenland').then((data) => {
                setGreenlandData(data);
            }).catch(() => {
                enqueueSnackbar("Could not get Greenland Weather data", { variant: 'error' })
            });
            getCountry('Norway').then((data) => {
                setNorwayData(data);
            }).catch(() => {
                enqueueSnackbar("Could not get Norway Weather data", { variant: 'error' })
            });
            getCountry('Alaska').then((data) => {
                setAlaskaData(data);
            }).catch(() => {
                enqueueSnackbar("Could not get Alaska Weather data", { variant: 'error' })
            });
            getCountry('Finland').then((data) => {
                setFinlandData(data);
            }).catch(() => {
                enqueueSnackbar("Could not get Finland Weather data", { variant: 'error' })
            });
        }
    }, [role]);

    const mexicoCalc = calculateAveragePerCountry(mexicoData ?? []);
    const franceCalc = calculateAveragePerCountry(franceData ?? []);
    const americaCalc = calculateAveragePerCountry(americaData ?? []);
    const spainCalc = calculateAveragePerCountry(spainData ?? []);

    return (
        <Box display={'flex'} flexDirection={'column'}>
            <LogoBar/>
            <Box className={'homeContent'}>
                {role === "sales" ?
                    <>
                        <React.Suspense fallback={<div>Loading Mexico...</div>}>
                            <LazyCountryTab
                                country={'Mexico'}
                                temp={mexicoCalc.avgTemp}
                                bgImage={MexicoHomeBg}
                                feelTemp={mexicoCalc.feelTemp}
                                wind={mexicoCalc.wind}
                                precip={mexicoCalc.precip}
                            />
                        </React.Suspense>
                        <React.Suspense fallback={<div>Loading France...</div>}>
                            <LazyCountryTab
                                country={'France'}
                                temp={franceCalc.avgTemp}
                                bgImage={FranceHomeBg}
                                feelTemp={franceCalc.feelTemp}
                                wind={franceCalc.wind}
                                precip={franceCalc.precip}
                            />
                        </React.Suspense>
                        <React.Suspense fallback={<div>Loading America...</div>}>
                            <LazyCountryTab
                                country={'United States'}
                                temp={americaCalc.avgTemp}
                                bgImage={AmericaHomeBg}
                                feelTemp={americaCalc.feelTemp}
                                wind={americaCalc.wind}
                                precip={americaCalc.precip}
                            />
                        </React.Suspense>
                        <React.Suspense fallback={<div>Loading Spain...</div>}>
                            <LazyCountryTab
                                country={'Spain'}
                                temp={spainCalc.avgTemp}
                                bgImage={SpainHomeBg}
                                feelTemp={spainCalc.feelTemp}
                                wind={spainCalc.wind}
                                precip={spainCalc.precip}
                            />
                        </React.Suspense>
                    </>
                    :
                    <>
                        <React.Suspense fallback={<div>Loading Greenland...</div>}>
                            <LazyCountryTab
                                country={'Greenland'}
                                temp={calculateAveragePerCountry(greenlandData ?? []).avgTemp}
                                bgImage={GreenlandHomeBg}
                                feelTemp={calculateAveragePerCountry(greenlandData ?? []).feelTemp}
                                wind={calculateAveragePerCountry(greenlandData ?? []).wind}
                                precip={calculateAveragePerCountry(greenlandData ?? []).precip}
                            />
                        </React.Suspense>

                        <React.Suspense fallback={<div>Loading Norway...</div>}>
                            <LazyCountryTab
                                country={'Norway'}
                                temp={calculateAveragePerCountry(norwayData ?? []).avgTemp}
                                bgImage={NorwayHomeBg}
                                feelTemp={calculateAveragePerCountry(norwayData ?? []).feelTemp}
                                wind={calculateAveragePerCountry(norwayData ?? []).wind}
                                precip={calculateAveragePerCountry(norwayData ?? []).precip}
                            />
                        </React.Suspense>

                        <React.Suspense fallback={<div>Loading Alaska...</div>}>
                            <LazyCountryTab
                                country={'Alaska'}
                                temp={calculateAveragePerCountry(alaskaData ?? []).avgTemp}
                                bgImage={AlaskaHomeBg}
                                feelTemp={calculateAveragePerCountry(alaskaData ?? []).feelTemp}
                                wind={calculateAveragePerCountry(alaskaData ?? []).wind}
                                precip={calculateAveragePerCountry(alaskaData ?? []).precip}
                            />
                        </React.Suspense>

                        <React.Suspense fallback={<div>Loading Finland...</div>}>
                            <LazyCountryTab
                                country={'Finland'}
                                temp={calculateAveragePerCountry(finlandData ?? []).avgTemp}
                                bgImage={FinlandHomeBg}
                                feelTemp={calculateAveragePerCountry(finlandData ?? []).feelTemp}
                                wind={calculateAveragePerCountry(finlandData ?? []).wind}
                                precip={calculateAveragePerCountry(finlandData ?? []).precip}
                            />
                        </React.Suspense>
                    </>
                }
            </Box>
        </Box>
    );
};