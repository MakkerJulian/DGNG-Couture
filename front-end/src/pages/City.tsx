import { Box, Button, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { WeatherData } from "../types/Weatherdata.ts";
import { getCountry } from "../util/IWARequests.ts";
import { enqueueSnackbar } from "notistack";
import { isCountryOption } from "../types/CountryOptions.ts";
import { getName, groupByDateTime } from "../util/WDGroupBy.ts";
import { LogoBar } from "../components/topbar.tsx";
import '../css/country.css'
import '../css/city.css'
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import * as Icons from '../icons'
import { DateGraph } from "../components/DateGraph.tsx";
import { CustomModal } from "../components/customModal.tsx";
import { convertToCSV } from "../util/CSVConverter.ts";
import { Penguin, Zara } from "../assets/index.tsx";

export const City = () => {
    const queryParameters = new URLSearchParams(window.location.search);
    const city = queryParameters.get("city") ?? "";
    const country = queryParameters.get("country") ?? "";

    const [cityData, setCityData] = useState<WeatherData[]>([]);
    const [timeData, setTimeData] = useState<Map<string, WeatherData>>(new Map());
    const [open, setOpen] = useState(false);
    const [format, setFormat] = useState<string>('json');
    const [name, setName] = useState<string>("");
    const [isSales, setSales] = useState<boolean>(false);

    useEffect(() => {
        const fetch = () => {
            if (city && isCountryOption(country)) {
                getCountry(country).then((data) => {
                    if (data) {
                        const cityData = data.filter((wd) => wd.weatherstation.geolocation.id === parseInt(city));
                        setName(getName(cityData[0]));
                        setSales(["United States", "Mexico", "France", "Spain"].includes(country));
                        setCityData(cityData);
                        setTimeData(groupByDateTime(cityData));
                    }
                }).catch(() => {
                    enqueueSnackbar("Could not get Weather data", { variant: 'error' })
                })
            }
        };
        fetch();
        const interval = setInterval(() => {
            fetch();
        }, 30000);
        return () => clearInterval(interval);
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
                    {data.freezing && <Icons.AcUnitIcon />}
                    {data.rain && <Icons.WaterDropIcon />}
                    {data.snow && <Icons.SevereColdIcon />}
                    {data.hail && <Icons.StormIcon />}
                    {data.thunder && <Icons.ThunderstormIcon />}
                    {data.tornado && <Icons.TornadoIcon />}
                </Box>;
            }
        },
    ];

    const handleOpen = () => {
        setOpen(true);
    };

    const handleDownload = () => {
        let data: WeatherData[] = []
        data = cityData;

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

    const timeStamps = Array.from(timeData).map(time => new Date(time[0]));
    const temps = Array.from(timeData).map(data => data[1].temp);
    const windspeeds = Array.from(timeData).map(data => data[1].windspeed);
    const precipitations = Array.from(timeData).map(data => data[1].precipitation);
    const airpressures = Array.from(timeData).map(data => data[1].s_airpressure);

    return (
        <Box>
            <LogoBar title={name} backbutton />
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
            <Button variant="contained" sx={{ margin: "0.4%" }} onClick={() => {
                handleOpen();
            }}>
                Download Data
            </Button>
            {
                cityData.length > 0 && <Box className={'nameAndData'}>
                    <Typography variant="h2">{isSales ? "Zara" : "Fiber Research Center"}</Typography>
                    <DataGrid
                        columns={columns}
                        rows={cityData}
                        className="dataGrid"
                        initialState={{
                            sorting: { sortModel: [{ field: 'datetime', sort: 'desc' }] },
                            pagination: { paginationModel: { pageSize: 10 } },
                        }}
                        pageSizeOptions={[10]}
                        sx={{
                            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)),url(${isSales ? Zara : Penguin})`,
                        }}
                    />
                </Box>
            }
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
        </Box >
    );
}