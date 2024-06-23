import { CityTab } from "../components/cityTab.tsx";
import React, { useEffect, useState } from "react";
import { WeatherData } from "../types/Weatherdata.ts";
import { getCountry } from "../util/IWARequests.ts";
import { enqueueSnackbar } from "notistack";
import { isCountryOption } from "../types/CountryOptions.ts";
import { groupByCity, groupByDateTime } from "../util/WDGroupBy.ts";
import { LogoBar } from "../components/topbar.tsx";
import '../css/country.css';
import '../css/filterBar.css';
import { DateGraph } from "../components/DateGraph.tsx";
import { CustomModal } from "../components/customModal.tsx";
import { SelectChangeEvent, Box, Typography, TextField, Select, MenuItem, Button, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { convertToCSV } from "../util/CSVConverter.ts";

export type filterData = {
    city: string,
    condition: string;
}

export const Country = () => {
    const queryParameters = new URLSearchParams(window.location.search);
    const country = queryParameters.get("country") ?? "";

    const [cityData, setCityData] = useState<Map<string, WeatherData>>(new Map());
    const [filteredData, setFilteredData] = useState<[string, WeatherData][]>([]);
    const [filters, setFilters] = useState<filterData>({ city: "", condition: "" });
    const [timeData, setTimeData] = useState<Map<string, WeatherData>>(new Map());
    const [open, setOpen] = useState(false);
    const [city, setCity] = useState<string>("");
    const [format, setFormat] = useState<string>('json');

    useEffect(() => {
        if (country && isCountryOption(country)) {
            getCountry(country).then((data) => {
                if (data) {
                    setCityData(groupByCity(data));
                    setFilteredData(Array.from(groupByCity(data)));
                    setTimeData(groupByDateTime(data));
                }
            }).catch(() => {
                enqueueSnackbar("Could not get Weather data", { variant: 'error' })
            })
        }
    }, [country]);


    useEffect(() => {
        let filtered = Array.from(cityData);

        if (filters.city !== "") {
            filtered = filtered.filter((data) => data[0] && data[0].startsWith(filters.city));
        }

        if (filters.condition !== "") {
            switch (filters.condition) {
                case "Clouds":
                    filtered = filtered.filter((data) => data[1].clouds);
                    break;
                case "Freezing":
                    filtered = filtered.filter((data) => data[1].freezing);
                    break;
                case "Tornado":
                    filtered = filtered.filter((data) => data[1].tornado);
                    break;
                case "Hail":
                    filtered = filtered.filter((data) => data[1].hail);
                    break;
                case "Snow":
                    filtered = filtered.filter((data) => data[1].snow);
                    break;
                case "Thunder":
                    filtered = filtered.filter((data) => data[1].thunder);
                    break;
            }
        }

        setFilteredData(filtered);
    }, [cityData, filters]);

    const timeStamps = Array.from(timeData).map(time => new Date(time[0]));
    const temps = Array.from(timeData).map(time => time[1].temp);
    const windspeeds = Array.from(timeData).map(time => time[1].windspeed);
    const precipitations = Array.from(timeData).map(time => time[1].precipitation);
    const airpressures = Array.from(timeData).map(time => time[1].s_airpressure);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    }

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        setFilters({ ...filters, condition: e.target.value });
    }

    let amountOfRain = 0;
    let amountOfSnow = 0;
    let amountOfTornados = 0;
    let amountOfThunder = 0;

    filteredData.map(data => {
        if (data[1].rain) {
            amountOfRain++;
        } if (data[1].snow) {
            amountOfSnow++;
        } if (data[1].tornado) {
            amountOfTornados++;
        } if (data[1].thunder) {
            amountOfThunder++;
        }
    });
    const handleOpen = (city: string) => {
        setCity(city);
        setOpen(true);
    };

    const handleDownload = () => {
        if (city === "") return;
        let data: WeatherData[] = []
        switch (city) {
            case 'country':
                data = filteredData.map((data) => data[1]);
                break;
            default:
                data = filteredData.filter((data) => data[0] === city).map((data) => data[1]);
                break;

        }
        if (data.length === 0) {
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
        <Box>
            <LogoBar title={country} backbutton />

            <Box className={"filterBar"}>
                <Typography className={"filterTitle"}>Filters</Typography>
                <TextField name={"city"} className={"filterInput"} placeholder={"City"} onChange={handleChange}></TextField>
                <Typography className={"filterTitle"}>Condition</Typography>
                <Select className={"filterDropDown"} defaultValue="" onChange={handleSelectChange}>
                    <MenuItem value={"Clouds"}>Clouds</MenuItem>
                    <MenuItem value={"Freezing"}>Freezing</MenuItem>
                    <MenuItem value={"Tornado"}>Tornado</MenuItem>
                    <MenuItem value={"Hail"}>Hail</MenuItem>
                    <MenuItem value={"Snow"}>Snow</MenuItem>
                    <MenuItem value={"Thunder"}>Thunder</MenuItem>
                </Select>
                <Button variant="contained" onClick={() => {
                    handleOpen("country");
                }}>
                    Download Data
                </Button>
            </Box>
            {timeStamps.length > 0 && <Box className={'countryGraphBox'}>
                <Box className={'countryGraphInclTitle'}>
                    <Typography variant="h4">
                        Average Temperature
                    </Typography>
                    <DateGraph timeStamps={timeStamps} data={temps} yAxisLabel="Temperature" />
                </Box>
                <Box className={'countryGraphInclTitle'}>
                    <Typography variant="h4">
                        Average Wind Speed
                    </Typography>
                    <DateGraph timeStamps={timeStamps} data={windspeeds} yAxisLabel="Wind Speed" />
                </Box>
                <Box className={'countryGraphInclTitle'}>
                    <Typography variant="h4">
                        Average Precipitation
                    </Typography>
                    <DateGraph timeStamps={timeStamps} data={precipitations} yAxisLabel="Precipitation" />
                </Box>
                <Box className={'countryGraphInclTitle'}>
                    <Typography variant="h4">
                        Average Air Pressure
                    </Typography>
                    <DateGraph timeStamps={timeStamps} data={airpressures} yAxisLabel="Airpressure" />
                </Box>
                <Typography variant="h4" sx={{"margin-left": "2vw", "margin-top": "3vh"}}>
                    Amount of cities: {filteredData.length}
                </Typography>
                <Box className={'countryOtherData'}>
                    <Typography>Cities with rain: {amountOfRain}</Typography>
                    <Typography>Cities with snow: {amountOfSnow}</Typography>
                    <Typography>Cities with tornados: {amountOfTornados}</Typography>
                    <Typography>Cities with thunder: {amountOfThunder}</Typography>
                </Box>
            </Box>}
            <Box className={'countryCityBox '}>
                {filteredData.map((data) => {
                    const weatherData = data[1];
                    return (
                        <CityTab
                            key={data[0]}
                            city={data[0]}
                            country={country}
                            weatherData={weatherData}
                            onDownloadClick={() => handleOpen(data[0])}
                        ></CityTab>
                    );
                })}
            </Box>
            <CustomModal
                title="Download Data"
                open={open}
                onSubmit={(event) => {
                    event.preventDefault();
                    handleDownload();
                    setOpen(false)
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
}