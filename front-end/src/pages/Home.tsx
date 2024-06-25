import { Box, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
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
import { CountryTab } from "../components/countryTab";

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
    const [downloadData, setDownLoadData] = useState<WeatherData[]>([]);
    const [format, setFormat] = useState<string>('json');

    useEffect(() => {
        const fetch = () => {
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
        };
        fetch();
        const interval = setInterval(fetch, 60000);
        return () => clearInterval(interval);
    }, [role]);

    const mexicoCalc = calculateAveragePerCountry(mexicoData);
    const franceCalc = calculateAveragePerCountry(franceData);
    const americaCalc = calculateAveragePerCountry(americaData);
    const spainCalc = calculateAveragePerCountry(spainData);

    const greenlandCalc = calculateAveragePerCountry(greenlandData);
    const norwayCalc = calculateAveragePerCountry(norwayData);
    const alaskaCalc = calculateAveragePerCountry(alaskaData);
    const finlandCalc = calculateAveragePerCountry(finlandData);

    const handleOpen = (data: WeatherData[]) => {
        setDownLoadData(data);
        setOpen(true);
    };

    const handleDownload = () => {
        if (downloadData.length === 0) {
            enqueueSnackbar("No data to download", { variant: 'error' });
            return;
        }
        const country = downloadData[0].weatherstation.geolocation.country.name;
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 10); // Format as YYYY-MM-DD

        if (format === 'json') {
            const json = JSON.stringify(downloadData, null, 2);
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
            const csv = convertToCSV(downloadData);
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
                        <CountryTab
                            country={'Mexico'}
                            temp={mexicoCalc.avgTemp}
                            wind={mexicoCalc.wind}
                            precip={mexicoCalc.precip}
                            onDownloadClick={() => handleOpen(mexicoData)}
                        />
                        <CountryTab
                            country={'France'}
                            temp={franceCalc.avgTemp}
                            wind={franceCalc.wind}
                            precip={franceCalc.precip}
                            onDownloadClick={() => handleOpen(franceData)}
                        />
                        <CountryTab
                            country={'United States'}
                            temp={americaCalc.avgTemp}
                            wind={americaCalc.wind}
                            precip={americaCalc.precip}
                            onDownloadClick={() => handleOpen(americaData)}
                        />
                        <CountryTab
                            country={'Spain'}
                            temp={spainCalc.avgTemp}
                            wind={spainCalc.wind}
                            precip={spainCalc.precip}
                            onDownloadClick={() => handleOpen(spainData)}
                        />
                    </>
                    :
                    <>
                        <CountryTab
                            country={'Greenland'}
                            temp={greenlandCalc.avgTemp}
                            wind={greenlandCalc.wind}
                            precip={greenlandCalc.precip}
                            onDownloadClick={() => handleOpen(greenlandData)}
                        />

                        <CountryTab
                            country={'Norway'}
                            temp={norwayCalc.avgTemp}
                            wind={norwayCalc.wind}
                            precip={norwayCalc.precip}
                            onDownloadClick={() => handleOpen(norwayData)}
                        />

                        <CountryTab
                            country={'Alaska'}
                            temp={alaskaCalc.avgTemp}
                            wind={alaskaCalc.wind}
                            precip={alaskaCalc.precip}
                            onDownloadClick={() => handleOpen(alaskaData)}
                        />

                        <CountryTab
                            country={'Finland'}
                            temp={finlandCalc.avgTemp}
                            wind={finlandCalc.wind}
                            precip={finlandCalc.precip}
                            onDownloadClick={() => handleOpen(finlandData)}
                        />
                    </>
                }
            </Box>
            <CustomModal
                title="Download Data"
                open={open}
                onSubmit={(event) => {
                    event.preventDefault();
                    handleDownload();
                    setOpen(false);
                }}
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
