import { WeatherData } from "../types/Weatherdata";
import { round } from "./round";

export const getName = (weatherData: WeatherData) => {
    const location = weatherData.weatherstation.geolocation;
    if(location.hamlet) return location.hamlet;
    if(location.village) return location.village;
    if(location.town) return location.town;
    if(location.city) return location.city;
    if(location.municipality) return location.municipality;
    if(location.place) return location.place
    if(location.locality) return location.locality;
    if(location.county) return location.county;
    if(location.region) return location.region;
    if(location.state) return location.state;

    return location.id.toString();
}

export const groupByCity = (data: WeatherData[]) => {
    const knownNames = new Map<string, WeatherData>();
    data.map((weatherData) => {
        const name = weatherData.weatherstation.geolocation.id.toString();

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
        //Format the date to only include the month and day
        const date = new Date(weatherData.datetime);
        const formattedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()).toDateString();

        weatherData.temp = round(weatherData.temp);
        weatherData.windspeed = round(weatherData.windspeed);
        weatherData.precipitation = round(weatherData.precipitation);

        if (knownNames.has(formattedDate)) {
            const knownData = knownNames.get(formattedDate);
            if (knownData) {
                knownData.temp = round((knownData.temp + weatherData.temp) / 2);
                knownData.windspeed = round((knownData.windspeed + weatherData.windspeed) / 2);
                knownData.precipitation = round((knownData.precipitation + weatherData.precipitation) / 2);
            }
        } else {
            knownNames.set(formattedDate, weatherData);
        }
    });
    return knownNames;
}