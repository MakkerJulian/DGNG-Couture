import { Box, Button, Typography } from "@mui/material";
import { CloudIcon } from "../icons";
import { useNavigate } from "react-router-dom";
import '../css/countryCard.css';

type CountryTabProps = {
    country: string;
    temp: number;
    bgImage: string;
    feelTemp: number;
    wind: number;
    precip: number;
    onDownloadClick: () => void;
};

const CountryTab = ({ country, temp, bgImage, feelTemp, wind, precip, onDownloadClick }: CountryTabProps) => {
    const navigate = useNavigate();

    const handleDownloadClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();  
        onDownloadClick();        
    };

    return (
        <button onClick={() => navigate("/country?country=" + country)}>
            <Box className="countryCard" sx={{ backgroundImage: `url(${bgImage})` }}>
                <Box className="countryCardText">
                    <Typography variant={'h2'}>{country}</Typography>
                    <Typography variant="h4">{temp}°</Typography>
                    <CloudIcon />
                </Box>

                <Box className="countryCardText Right">
                    <Typography variant='h6'>Feels like {feelTemp}</Typography>
                    <Typography variant="h6">Wind {wind}km/h</Typography>
                    <Typography variant="h6">Precip {precip}%</Typography>
                    <Button variant="contained" onClick={handleDownloadClick}>Download Data</Button>
                </Box>
            </Box>
        </button>
    );
};

export default CountryTab;
