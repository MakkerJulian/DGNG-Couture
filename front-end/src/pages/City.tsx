import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { WeatherData } from "../types/Weatherdata.ts";
import { getCountry } from "../util/IWARequests.ts";
import { enqueueSnackbar } from "notistack";
import { isCountryOption } from "../types/CountryOptions.ts";
import { LineChart } from "@mui/x-charts";
import { groupByDateTime } from "../util/WDGroupBy.ts";
import { LogoBar } from "../components/topbar.tsx";
import '../css/country.css'
import '../css/city.css'
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import * as Icons from '../icons'
import { DateGraph } from "../components/DateGraph.tsx";

export const City = () => {
    const queryParameters = new URLSearchParams(window.location.search);
    const city = queryParameters.get("city") ?? "";
    const country = queryParameters.get("country") ?? "";

    const [cityData, setCityData] = useState<WeatherData[]>([]);
    const [timeData, setTimeData] = useState<Map<string, WeatherData>>(new Map());

    useEffect(() => {
        if (city && isCountryOption(country)) {
            getCountry(country).then((data) => {
                if (data) {
                    const cityData = data.filter((wd) => {
                        return wd.weatherstation.geolocation.city === city
                            || wd.weatherstation.geolocation.town === city
                            || wd.weatherstation.geolocation.village === city
                            || wd.weatherstation.geolocation.place === city
                            || wd.weatherstation.geolocation.county === city;
                    });
                    setCityData(cityData);
                    setTimeData(groupByDateTime(cityData));
                }
            }).catch(() => {
                enqueueSnackbar("Could not get Weather data", { variant: 'error' })
            })
        }
    }, [city, country]);

    const columns: GridColDef<WeatherData>[] = [
        {
            field: 'datetime', headerName: 'Date', flex: 1,
            valueFormatter: (params) => {
                const date = new Date(params as string);
                return date.toLocaleDateString() + " " + date.toLocaleTimeString();
            }
        },
        { field: 'temp', headerName: 'Temperature', flex: 1 },
        { field: 'windspeed', headerName: 'Wind Speed', flex: 1 },
        { field: 'precipitation', headerName: 'Precipitation', flex: 1 },
        { field: 's_airpressure', headerName: 'Air Pressure', flex: 1 },
        {
            field: 'freezing', headerName: 'Special', flex: 1, renderCell: (params) => {
                const data = params.row as WeatherData;
                return <Box>
                    {data.clouds > 50 && <Icons.CloudIcon />}
                    {data.freezing && <Icons.SevereColdIcon />}
                    {data.rain && <Icons.WaterDropIcon />}
                    {data.snow && <Icons.AcUnitIcon />}
                    {data.hail && <Icons.StormIcon />}
                    {data.thunder && <Icons.ThunderstormIcon />}
                    {data.tornado && <Icons.TornadoIcon />}
                </Box>;
            }
        },
    ];


    const timeStamps = Array.from(timeData).map(time => new Date(time[0]));
    const temps = Array.from(timeData).map(data => data[1].temp);
    const windspeeds = Array.from(timeData).map(data => data[1].windspeed);
    const precipitations = Array.from(timeData).map(data => data[1].precipitation);
    const airpressures = Array.from(timeData).map(data => data[1].s_airpressure);

    return (
        <Box>
            <LogoBar title={city} backbutton />
            {timeStamps.length > 0 && <Box className={'countryGraphBox'}>
                <Box className={'countryGraphInclTitle'}>
                    <Typography variant="h4">
                        Average Temperature
                    </Typography>
                    <DateGraph
                        yAxisLabel={"Temperature"}
                        timeStamps={timeStamps}
                        data={temps}
                    ></DateGraph>
                </Box>
                <Box className={'countryGraphInclTitle'}>
                    <Typography variant="h4">
                        Average Wind Speed
                    </Typography>
                    <DateGraph
                        yAxisLabel={"Wind speed"}
                        timeStamps={timeStamps}
                        data={windspeeds}
                    ></DateGraph>

                </Box>
                <Box className={'countryGraphInclTitle'}>
                    <Typography variant="h4">
                        Average Precipitation
                    </Typography>
                    <DateGraph
                        yAxisLabel={"Precipitation"}
                        timeStamps={timeStamps}
                        data={precipitations}
                    ></DateGraph>
                </Box>

                <Box className={'countryGraphInclTitle'}>
                    <Typography variant="h4">
                        Average Air Pressure
                    </Typography>
                    <DateGraph
                        yAxisLabel={"Air Pressure"}
                        timeStamps={timeStamps}
                        data={airpressures}
                    ></DateGraph>
                </Box>
            </Box>}
            {
                cityData.length > 0 && <Box className={'nameAndData'}>
                    <Typography variant="h2"> Zara </Typography>
                    <DataGrid
                        columns={columns}
                        rows={cityData}
                        className="dataGrid"
                        initialState={{
                            sorting: { sortModel: [{ field: 'datetime', sort: 'desc' }] },
                            pagination: { paginationModel: { pageSize: 10 } },
                        }}
                    />
                </Box>
            }
        </Box >
    );
}