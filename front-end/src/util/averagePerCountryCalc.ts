import { WeatherData } from "../types/Weatherdata";

export const calculateAveragePerCountry = (data: WeatherData[]) => {
    if(data.length === 0) return { avgTemp: 0, feelTemp: 0, wind: 0, precip: 0 };
    let avgTemp = data.reduce((acc, curr) => acc + Number(curr.temp), 0) / data.length;
    let feelTemp = avgTemp + Math.floor(Math.random() * 10);
    let wind = data.reduce((acc, curr) => acc + Number(curr.windspeed), 0) / data.length;
    let precip = data.reduce((acc, curr) => acc + Number(curr.precipitation), 0) / data.length; 


    //round all data to 2 decimal places
    avgTemp = Math.round(avgTemp * 100) / 100;
    feelTemp = Math.round(feelTemp * 100) / 100;
    wind = Math.round(wind * 100) / 100;
    precip = Math.round(precip * 100) / 100;

    return { avgTemp, feelTemp, wind, precip };
}