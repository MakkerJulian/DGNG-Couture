import React, { useEffect } from 'react';
import { convertToCSV } from '../util/CSVConverter';
import { WeatherData } from '../types/Weatherdata';

interface DownloadDataProps {
    format: string | null;
    downloadData: { country: string, data: WeatherData[] } | null;
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setDownloadData: React.Dispatch<React.SetStateAction<{ country: string, data: WeatherData[] } | null>>;
    setFormat: React.Dispatch<React.SetStateAction<string | null>>;
}

const DownloadData: React.FC<DownloadDataProps> = ({ format, downloadData, setDialogOpen, setDownloadData, setFormat }) => {
    useEffect(() => {
        if (format && downloadData) {
            const { country, data } = downloadData;

            if (format === 'json') {
                const json = JSON.stringify(data, null, 2);
                const blob = new Blob([json], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `${country}-weather-data.json`;
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
                link.download = `${country}-weather-data.csv`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            }

            // Reset the states after downloading
            setDialogOpen(false);
            setDownloadData(null);
            setFormat(null);
        }
    }, [format, downloadData, setDialogOpen, setDownloadData, setFormat]);

    return null;
};

export default DownloadData;
