import { IWAAxiosInstance } from "../axios"
import { CountryOptions } from "../types/CountryOptions";
import { WeatherData } from "../types/Weatherdata";

//limit the country options in the typing

export const getCountry = async (country: CountryOptions) : Promise<WeatherData[]> => {
    const res = await IWAAxiosInstance.get<WeatherData[]>('/extern/country',{
        params: {
            token: import.meta.env.VITE_APP_IWATOKEN ?? '',
            country: country !== 'Alaska' ? country : 'United States'
        }
    });

    if(country === 'Alaska'){
        return res.data.filter(data => data.weatherstation.geolocation.state === 'Alaska')
    }
    return res.data;
}