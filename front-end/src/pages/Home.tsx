import { Box } from "@mui/material";
import React from "react";
import { AmericaHomeBg, CoutureLogo, FranceHomeBg, MexicoHomeBg, SpainHomeBg } from "../assets";
import '../css/home.css'

export const Home = () => {
    return (
        <Box display={'flex'} flexDirection={'column'}>
            <Box className={'logoBar'}>
                <img src={CoutureLogo} style={{ width: '20vw', height: '10vh' }}></img>
            </Box>
            <Box className={'homeContent'}>
                <Box className="countryCard" sx={{ backgroundImage: `url(${MexicoHomeBg})` }}>
                    <Box className="countryCardText">
                        <h1>Mexico</h1>
                    </Box>
                </Box>
                <Box className="countryCard" sx={{ backgroundImage: `url(${FranceHomeBg})` }}>
                    <Box className="countryCardText">
                        <h1>France</h1>
                    </Box>
                </Box>
                <Box className="countryCard" sx={{ backgroundImage: `url(${AmericaHomeBg})` }}>
                    <Box className="countryCardText">
                        <h1>America</h1>
                    </Box>
                </Box>
                <Box className="countryCard" sx={{ backgroundImage: `url(${SpainHomeBg})` }}>
                    <Box className="countryCardText">
                        <h1>Spain</h1>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};