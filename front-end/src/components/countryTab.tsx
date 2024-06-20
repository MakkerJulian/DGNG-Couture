import { Box, Button, Typography } from "@mui/material";
import { CloudIcon } from "../icons";
import { useNavigate } from "react-router-dom";
import '../css/countryCard.css';

type CountryTabProps = {
    country: string;
    temp: number;
    bgImage: string;
    wind: number;
    precip: number;
    onDownloadClick: () => void;
};

const CountryTab = ({ country, temp, bgImage, wind, precip, onDownloadClick }: CountryTabProps) => {
    const navigate = useNavigate();

    return (
        <Box className="countryCard" sx={{ backgroundImage: `url(${bgImage})` }} onClick={() => navigate("/country?country=" + country)}>
            <Box className="countryCardText">
                <Typography variant={'h2'}>{country}</Typography>
                <Typography variant="h4">{temp}°</Typography>
                <CloudIcon />
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

export default CountryTab;
