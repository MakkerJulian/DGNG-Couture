import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import '../css/countryCard.css';

type CountryTabProps = {
    country: string;
    temp: number;
    wind: number;
    precip: number;
    onDownloadClick: () => void;
};

export const CountryTab = ({ country, temp, wind, precip, onDownloadClick }: CountryTabProps) => {
    const navigate = useNavigate();
    let img;

    switch (country) {
        case "Spain":
            img = 'src/assets/SpainHomeBg.png';
            break;
        case "United States":
            img = 'src/assets/AmericaHomeBg.png';
            break;
        case "France":
            img = 'src/assets/FranceHomeBg.png';
            break;
        case "Mexico":
            img = 'src/assets/MexicoHomeBg.png';
            break;
        case "Greenland":
            img = 'src/assets/GreenlandHomeBg.png';
            break;
        case "Norway":
            img = 'src/assets/NorwayHomeBg.png';
            break;
        case "Alaska":
            img = 'src/assets/AlaskaHomeBg.png';
            break;
        case "Finland":
            img = 'src/assets/FinlandHomeBg.png';
            break;
        default:
            img = ""
    }

    return (
        <Box
            className="countryCard"
            onClick={() => navigate("/country?country=" + country)}
        >
            <img loading="lazy" src={img} className="backgroundImage" />

            <Box className="countryCardText">
                <Typography variant={'h2'}>{country}</Typography>
                <Typography variant="h4">{temp}°</Typography>
            </Box>

            <Box className="countryCardText Right">
                <Typography variant="h6">Wind {wind}km/h</Typography>
                <Typography variant="h6">Precip {precip}%</Typography>
                <Button variant="contained" onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    onDownloadClick();
                }}>
                    Download Data
                </Button>
            </Box>

        </Box >
    );
};