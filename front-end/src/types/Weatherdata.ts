export type WeatherData = {
    id: number;
    datetime: string;
    temp: number;
    dew_point: number;
    s_airpressure: number;
    sea_airpressure: number;
    visibility: number;
    windspeed: number;
    precipitation: number;
    snow_amount: number;
    freezing: boolean;
    rain: boolean;
    snow: boolean;
    hail: boolean;
    thunder: boolean;
    tornado: boolean;
    clouds: number;
    wind_direction: number;
    weatherstation: WeatherStation;
}

type WeatherStation = {
    name: string;
    longitude: number;
    latitude: number;
    elevation: number;
    geolocation: Geolocation;
}

type Geolocation = {
    id : number;
    village: string;
    town: string;
    city: string;
    country: Country;
    state: string;
}

type Country = {
    name: string;
    code: string;
}