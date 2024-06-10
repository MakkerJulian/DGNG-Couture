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
    const knownNames = new Map<Date, WeatherData>();
    data.map((weatherData) => {
        //Make time the hours + minutes in string format
        const date = new Date(weatherData.datetime);

        weatherData.temp = round(weatherData.temp);
        weatherData.windspeed = round(weatherData.windspeed);
        weatherData.precipitation = round(weatherData.precipitation);

        if (knownNames.has(date)) {
            const knownData = knownNames.get(date);
            if (knownData) {
                knownData.temp = round((knownData.temp + weatherData.temp) / 2);
                knownData.windspeed = round((knownData.windspeed + weatherData.windspeed) / 2);
                knownData.precipitation = round((knownData.precipitation + weatherData.precipitation) / 2);
            }
        } else {
            knownNames.set(date, weatherData);
        }
    });
    return knownNames;
}