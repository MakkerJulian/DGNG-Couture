import { WeatherData } from "../types/Weatherdata";
import { round } from "./round";

export const groupByCity = (data: WeatherData[]) => {
    const knownNames = new Map<string, WeatherData>();
    data.map((weatherData) => {
        const name = weatherData.weatherstation.geolocation.city
            ?? weatherData.weatherstation.geolocation.town
            ?? weatherData.weatherstation.geolocation.village
            ?? weatherData.weatherstation.geolocation.place;

        weatherData.temp = round(weatherData.temp);
        weatherData.windspeed = round(weatherData.windspeed);
        weatherData.precipitation = round(weatherData.precipitation);

        if (knownNames.has(name)) {
            const knownData = knownNames.get(name);
            if (knownData) {
                knownData.temp = round((knownData.temp + weatherData.temp) / 2);
                knownData.windspeed = round((knownData.windspeed + weatherData.windspeed) / 2);
                knownData.precipitation = round((knownData.precipitation + weatherData.precipitation) / 2);
            }
        } else {
            knownNames.set(name, weatherData);
        }
    });
    return knownNames;
}

export const groupByDateTime = (data: WeatherData[]) => {
    const knownNames = new Map<string, WeatherData>();
    data.map((weatherData) => {
        //Make time the hours + minutes in string format
        const date = new Date(weatherData.datetime);
        const time = date.getFullYear() + ":"+ date.getDay() + ":" + date.getHours();

        weatherData.temp = round(weatherData.temp);
        weatherData.windspeed = round(weatherData.windspeed);
        weatherData.precipitation = round(weatherData.precipitation);

        if (knownNames.has(time)) {
            const knownData = knownNames.get(time);
            if (knownData) {
                knownData.temp = round((knownData.temp + weatherData.temp) / 2);
                knownData.windspeed = round((knownData.windspeed + weatherData.windspeed) / 2);
                knownData.precipitation = round((knownData.precipitation + weatherData.precipitation) / 2);
            }
        } else {
            knownNames.set(time, weatherData);
        }
    });
    return knownNames;
}