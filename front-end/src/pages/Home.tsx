import { Box, Typography } from "@mui/material";
import { AmericaHomeBg, CoutureLogo, FranceHomeBg, MexicoHomeBg, SpainHomeBg } from "../assets";
import '../css/home.css'
import { CloudIcon, TornadoIcon, WaterDropIcon, WbSunnyIcon } from "../icons";

export const Home = () => {
    return (
        <Box display={'flex'} flexDirection={'column'}>
            <Box className={'logoBar'}>
                <img src={CoutureLogo} className="logo"></img>
            </Box>
            <Box className={'homeContent'}>
                <Box className="countryCard" sx={{ backgroundImage: `url(${MexicoHomeBg})` }}>
                    <Box className="countryCardText">
                        <Typography variant={'h2'}>Mexico</Typography>
                        <Typography variant="h4">28°</Typography>
                        <CloudIcon />
                    </Box>

                    <Box className="countryCardText Right">
                        <Typography variant={'h6'}>Feels like 30</Typography>
                        <Typography variant="h6">Humidity 50%</Typography>
                        <Typography variant="h6">Wind 15km/h</Typography>
                        <Typography variant="h6">Precip 20%</Typography>
                    </Box>
                </Box>
                <Box className="countryCard" sx={{ backgroundImage: `url(${FranceHomeBg})` }}>
                    <Box className="countryCardText">
                        <Typography variant={'h2'}>France</Typography>
                        <Typography variant="h4">19°</Typography>
                        <WaterDropIcon />
                    </Box>
                    <Box className="countryCardText Right">
                        <Typography variant={'h6'}>Feels like 29</Typography>
                        <Typography variant="h6">Humidity 80%</Typography>
                        <Typography variant="h6">Wind 5km/h</Typography>
                        <Typography variant="h6">Precip 10%</Typography>
                    </Box>
                </Box>
                <Box className="countryCard" sx={{ backgroundImage: `url(${AmericaHomeBg})` }}>
                    <Box className="countryCardText">
                        <Typography variant={'h2'}>America</Typography>
                        <Typography variant="h4">15°</Typography>
                        <TornadoIcon />
                    </Box>

                    <Box className="countryCardText Right">
                        <Typography variant={'h6'}>Feels like 16</Typography>
                        <Typography variant="h6">Humidity 20%</Typography>
                        <Typography variant="h6">Wind 60km/h</Typography>
                        <Typography variant="h6">Precip 100%</Typography>
                    </Box>

                </Box>
                <Box className="countryCard" sx={{ backgroundImage: `url(${SpainHomeBg})` }}>
                    <Box className="countryCardText">
                        <Typography variant={'h2'}>Spain</Typography>
                        <Typography variant="h4">32°</Typography>
                        <WbSunnyIcon />
                    </Box>

                    <Box className="countryCardText Right">
                        <Typography variant={'h6'}>Feels like 30</Typography>
                        <Typography variant="h6">Humidity 10%</Typography>
                        <Typography variant="h6">Wind 10km/h</Typography>
                        <Typography variant="h6">Precip 0%</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};