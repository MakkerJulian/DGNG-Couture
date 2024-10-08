import { WeatherData } from "../types/Weatherdata";

export const convertToCSV = (data: WeatherData[]): string => {
    if (!data || data.length === 0) {
        return '';
    }
    const headers = Object.keys(data[0]);

    const csvRows = data.map(row => {
        const values = headers.map(header => {
            let value = row[header as keyof WeatherData];

            if (typeof value === 'object' && value !== null) {

                value = JSON.stringify(value);
            } else {
                value = String(value); 
            }
     
            return value.replace(/"/g, '""');
        });

        return values.join(','); 
    });

    return [headers.join(','), ...csvRows].join('\n');    
};