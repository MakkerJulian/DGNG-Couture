import { Box, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { AlaskaHomeBg, AmericaHomeBg, FranceHomeBg, FinlandHomeBg, GreenlandHomeBg, MexicoHomeBg, NorwayHomeBg, SpainHomeBg } from "../assets";
import '../css/home.css';
import { getRole } from "../util/getrole";
import React, { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { calculateAveragePerCountry } from "../util/averagePerCountryCalc";
import { getCountry } from "../util/IWARequests";
import { WeatherData } from "../types/Weatherdata";
import { LogoBar } from "../components/topbar";
import { CustomModal } from "../components/customModal";
import { convertToCSV } from "../util/CSVConverter";

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

    const [open, setOpen] = useState(false);
    const [country, setCountry] = useState<string>("");
    const [format, setFormat] = useState<string>('json');

    useEffect(() => {
        if (role === 'sales') {
            getCountry('Spain').then((data) => {
                setSpainData(data);
            }).catch(() => {
                enqueueSnackbar("Could not get Spain Weather data", { variant: 'error' });
            });
            getCountry('Mexico').then((data) => {
                setMexicoData(data);
            }).catch(() => {
                enqueueSnackbar("Could not get Mexico Weather data", { variant: 'error' });
            });
            getCountry('France').then((data) => {
                setFranceData(data);
            }).catch(() => {
                enqueueSnackbar("Could not get France Weather data", { variant: 'error' });
            });
            getCountry('United States').then((data) => {
                setAmericaData(data);
            }).catch(() => {
                enqueueSnackbar("Could not get America Weather data", { variant: 'error' });
            });
        } else {
            getCountry('Greenland').then((data) => {
                setGreenlandData(data);
            }).catch(() => {
                enqueueSnackbar("Could not get Greenland Weather data", { variant: 'error' });
            });
            getCountry('Norway').then((data) => {
                setNorwayData(data);
            }).catch(() => {
                enqueueSnackbar("Could not get Norway Weather data", { variant: 'error' });
            });
            getCountry('Alaska').then((data) => {
                setAlaskaData(data);
            }).catch(() => {
                enqueueSnackbar("Could not get Alaska Weather data", { variant: 'error' });
            });
            getCountry('Finland').then((data) => {
                setFinlandData(data);
            }).catch(() => {
                enqueueSnackbar("Could not get Finland Weather data", { variant: 'error' });
            });
        }
    }, [role]);

    const mexicoCalc = calculateAveragePerCountry(mexicoData);
    const franceCalc = calculateAveragePerCountry(franceData);
    const americaCalc = calculateAveragePerCountry(americaData);
    const spainCalc = calculateAveragePerCountry(spainData);
    
    const greenlandCalc = calculateAveragePerCountry(greenlandData);
    const norwayCalc = calculateAveragePerCountry(norwayData);
    const alaskaCalc = calculateAveragePerCountry(alaskaData);
    const finlandCalc = calculateAveragePerCountry(finlandData);

    const handleOpen = (country: string) => {
        setCountry(country);
        setOpen(true);
    };

    const handleDownload = () => {
        if (country === "") return;
        let data: WeatherData[] = []
        switch (country) {
            case 'Mexico':
                data = mexicoData;
                break;
            case 'France':
                data = franceData;
                break;
            case 'United States':
                data = americaData;
                break;
            case 'Spain':
                data = spainData;
                break;
            case 'Greenland':
                data = greenlandData;
                break;
            case 'Norway':
                data = norwayData;
                break;
            case 'Alaska':
                data = alaskaData;
                break;
            case 'Finland':
                data = finlandData;
                break;
        }
        if(data.length === 0){
            enqueueSnackbar("No data to download", { variant: 'error' });
            return;
        }
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 10); // Format as YYYY-MM-DD

        if (format === 'json') {
            const json = JSON.stringify(data, null, 2);
            const blob = new Blob([json], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${country}-weather-data-${formattedDate}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } else if (format === 'csv') {
            const csv = convertToCSV(data);
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${country}-weather-data-${formattedDate}.csv`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }
    }


    return (
        <Box display={'flex'} flexDirection={'column'}>
            <LogoBar />
            <Box className={'homeContent'}>
                {role === "sales" ?
                    <>
                        <React.Suspense fallback={<div>Loading Mexico...</div>}>
                            <LazyCountryTab
                                country={'Mexico'}
                                temp={mexicoCalc.avgTemp}
                                bgImage={MexicoHomeBg}
                                wind={mexicoCalc.wind}
                                precip={mexicoCalc.precip}
                                onDownloadClick={() => handleOpen('Mexico')}
                            />
                        </React.Suspense>
                        <React.Suspense fallback={<div>Loading France...</div>}>
                            <LazyCountryTab
                                country={'France'}
                                temp={franceCalc.avgTemp}
                                bgImage={FranceHomeBg}
                                wind={franceCalc.wind}
                                precip={franceCalc.precip}
                                onDownloadClick={() => handleOpen('France')}
                            />
                        </React.Suspense>
                        <React.Suspense fallback={<div>Loading America...</div>}>
                            <LazyCountryTab
                                country={'United States'}
                                temp={americaCalc.avgTemp}
                                bgImage={AmericaHomeBg}
                                wind={americaCalc.wind}
                                precip={americaCalc.precip}
                                onDownloadClick={() => handleOpen('United States')}
                            />
                        </React.Suspense>
                        <React.Suspense fallback={<div>Loading Spain...</div>}>
                            <LazyCountryTab
                                country={'Spain'}
                                temp={spainCalc.avgTemp}
                                bgImage={SpainHomeBg}
                                wind={spainCalc.wind}
                                precip={spainCalc.precip}
                                onDownloadClick={() => handleOpen('Spain')}
                            />
                        </React.Suspense>
                    </>
                    :
                    <>
                        <React.Suspense fallback={<div>Loading Greenland...</div>}>
                            <LazyCountryTab
                                country={'Greenland'}
                                temp={greenlandCalc.avgTemp}
                                bgImage={GreenlandHomeBg}
                                wind={greenlandCalc.wind}
                                precip={greenlandCalc.precip}
                                onDownloadClick={() => handleOpen('Greenland')}
                            />
                        </React.Suspense>

                        <React.Suspense fallback={<div>Loading Norway...</div>}>
                            <LazyCountryTab
                                country={'Norway'}
                                temp={norwayCalc.avgTemp}
                                bgImage={NorwayHomeBg}
                                wind={norwayCalc.wind}
                                precip={norwayCalc.precip}
                                onDownloadClick={() => handleOpen('Norway')}
                            />
                        </React.Suspense>

                        <React.Suspense fallback={<div>Loading Alaska...</div>}>
                            <LazyCountryTab
                                country={'Alaska'}
                                temp={alaskaCalc.avgTemp}
                                bgImage={AlaskaHomeBg}
                                wind={alaskaCalc.wind}
                                precip={alaskaCalc.precip}
                                onDownloadClick={() => handleOpen('Alaska')}
                            />
                        </React.Suspense>

                        <React.Suspense fallback={<div>Loading Finland...</div>}>
                            <LazyCountryTab
                                country={'Finland'}
                                temp={finlandCalc.avgTemp}
                                bgImage={FinlandHomeBg}
                                wind={finlandCalc.wind}
                                precip={finlandCalc.precip}
                                onDownloadClick={() => handleOpen('Finland')}
                            />
                        </React.Suspense>
                    </>
                }
            </Box>
            <CustomModal
                title="Download Data"
                open={open}
                onSubmit={handleDownload}
                setOpen={setOpen}
                onSubmitText="Download"
            >
                <Typography>
                    Select your desired format
                </Typography>

                <RadioGroup
                    defaultValue="json"
                    name="Format selector"
                    onChange={(event) => setFormat(event.target.value)}
                >
                    <FormControlLabel value="json" control={<Radio />} label="Json" />
                    <FormControlLabel value="csv" control={<Radio />} label="CSV" />
                </RadioGroup>
            </CustomModal>
        </Box>
    );
};
