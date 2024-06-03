import { Box } from "@mui/material";
import { AlaskaHomeBg, AmericaHomeBg, CoutureLogo, FranceHomeBg, FinlandHomeBg, GreenlandHomeBg, MexicoHomeBg, NorwayHomeBg, SpainHomeBg } from "../assets";
import '../css/home.css'
import { CountryTab } from "../components/countryTab";
import { getRole } from "../util/getrole";
import { LogoutButton } from "../components/logoutButton";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { calculateAveragePerCountry } from "../util/averagePerCountryCalc";
import { getCountry } from "../util/IWARequests";
import { WeatherData } from "../types/Weatherdata";

export const Home = () => {
    const role = getRole();

    const [mexicoData, setMexicoData] = useState<WeatherData[] | null>();
    const [franceData, setFranceData] = useState<WeatherData[] | null>();
    const [americaData, setAmericaData] = useState<WeatherData[] | null>();
    const [spainData, setSpainData] = useState<WeatherData[] | null>();

    const [greenlandData, setGreenlandData] = useState<WeatherData[] | null>();
    const [norwayData, setNorwayData] = useState<WeatherData[] | null>();
    const [alaskaData, setAlaskaData] = useState<WeatherData[] | null>();
    const [finlandData, setFinlandData] = useState<WeatherData[] | null>();

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
    }, []);

    const mexicoCalc = calculateAveragePerCountry(mexicoData ?? []);
    const franceCalc = calculateAveragePerCountry(franceData ?? []);
    const americaCalc = calculateAveragePerCountry(americaData ?? []);
    const spainCalc = calculateAveragePerCountry(spainData ?? []);

    return (
        <Box display={'flex'} flexDirection={'column'}>
            <Box className={'logoBar'}>
                <img src={CoutureLogo} className="logo"></img>
                <LogoutButton />
            </Box>
            <Box className={'homeContent'}>
                {role === "sales" ?
                    <>
                        <CountryTab
                            country={'Mexico'}
                            temp={mexicoCalc.avgTemp}
                            bgImage={MexicoHomeBg}
                            feelTemp={mexicoCalc.feelTemp}
                            wind={mexicoCalc.wind}
                            precip={mexicoCalc.precip}
                        ></CountryTab>

                        <CountryTab
                            country={'France'}
                            temp={franceCalc.avgTemp}
                            bgImage={FranceHomeBg}
                            feelTemp={franceCalc.feelTemp}
                            wind={franceCalc.wind}
                            precip={franceCalc.precip}
                        ></CountryTab>

                        <CountryTab
                            country={'America'}
                            temp={americaCalc.avgTemp}
                            bgImage={AmericaHomeBg}
                            feelTemp={americaCalc.feelTemp}
                            wind={americaCalc.wind}
                            precip={americaCalc.precip}
                        ></CountryTab>

                        <CountryTab
                            country={'Spain'}
                            temp={spainCalc.avgTemp}
                            bgImage={SpainHomeBg}
                            feelTemp={spainCalc.feelTemp}
                            wind={spainCalc.wind}
                            precip={spainCalc.precip}
                        />
                    </>
                    :
                    <>
                        <CountryTab
                            country={'Greenland'}
                            temp={calculateAveragePerCountry(greenlandData ?? []).avgTemp}
                            bgImage={GreenlandHomeBg}
                            feelTemp={calculateAveragePerCountry(greenlandData ?? []).feelTemp}
                            wind={calculateAveragePerCountry(greenlandData ?? []).wind}
                            precip={calculateAveragePerCountry(greenlandData ?? []).precip}
                        ></CountryTab>

                        <CountryTab
                            country={'Norway'}
                            temp={calculateAveragePerCountry(norwayData ?? []).avgTemp}
                            bgImage={NorwayHomeBg}
                            feelTemp={calculateAveragePerCountry(norwayData ?? []).feelTemp}
                            wind={calculateAveragePerCountry(norwayData ?? []).wind}
                            precip={calculateAveragePerCountry(norwayData ?? []).precip}
                        ></CountryTab>

                        <CountryTab
                            country={'Alaska'}
                            temp={calculateAveragePerCountry(alaskaData ?? []).avgTemp}
                            bgImage={AlaskaHomeBg}
                            feelTemp={calculateAveragePerCountry(alaskaData ?? []).feelTemp}
                            wind={calculateAveragePerCountry(alaskaData ?? []).wind}
                            precip={calculateAveragePerCountry(alaskaData ?? []).precip}
                        ></CountryTab>

                        <CountryTab
                            country={'Finland'}
                            temp={calculateAveragePerCountry(finlandData ?? []).avgTemp}
                            bgImage={FinlandHomeBg}
                            feelTemp={calculateAveragePerCountry(finlandData ?? []).feelTemp}
                            wind={calculateAveragePerCountry(finlandData ?? []).wind}
                            precip={calculateAveragePerCountry(finlandData ?? []).precip}
                        ></CountryTab>
                    </>
                }
            </Box>
        </Box>
    );
};