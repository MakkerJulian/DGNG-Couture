import { IWAAxiosInstance } from "../axios"

//limit the country options in the typing
type CountryOptions = 'Mexico' | 'France' | 'United States' | 'Spain' | 'Greenland' | 'Norway' | 'Alaska' | 'Finland'

export const getCountry = async (country: CountryOptions) => {
    const res = await IWAAxiosInstance.get('/extern',{
        params: {
            token: import.meta.env.VITE_APP_IWATOKEN,
            country: country !== 'Alaska' ? country : 'United States'
        }
    })

    if(country === 'Alaska'){
        return res.data.filter((data: any) => data.weatherstation.geolocation.state === 'Alaska')
    }
    return res.data;
}