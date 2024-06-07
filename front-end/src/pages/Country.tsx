import {Box, Typography} from "@mui/material";
import {MexicoHomeBg} from "../assets";
import {CityTab} from "../components/cityTab.tsx";
import {Graph} from "../components/graph.tsx";

export const Country = () => {
    const queryParameters = new URLSearchParams(window.location.search);
    const country = queryParameters.get("country");
    return (
        <Box>
            <Box class={'logoBar'}>
                <Typography variant={'h1'}>{country}</Typography>
            </Box>
            <Box class={'countryGraphBox'}>
                <Graph data={[-2,-5,6,7, 15, 3]}/>
                <Graph data={[5,5,4,7, 4, 5, 7]}/>
                <Graph data={[-33,-5,-6,-7, -3, -25]}/>
                <Graph data={[15,53,30,7, 5, 1,24, 25, 12]}/>
            </Box>
            <Box class={'countryCityBox '}>
                <CityTab
                    city={'Mexico'}
                    temp={45}
                    bgImage={MexicoHomeBg}
                    feelTemp={45}
                    wind={45}
                    precip={24}
                ></CityTab>
                <CityTab
                    city={'Mexico'}
                    temp={45}
                    bgImage={MexicoHomeBg}
                    feelTemp={45}
                    wind={45}
                    precip={24}
                ></CityTab>
                <CityTab
                    city={'Mexico'}
                    temp={45}
                    bgImage={MexicoHomeBg}
                    feelTemp={45}
                    wind={45}
                    precip={24}
                ></CityTab>
                <CityTab
                    city={'Mexico'}
                    temp={45}
                    bgImage={MexicoHomeBg}
                    feelTemp={45}
                    wind={45}
                    precip={24}
                ></CityTab>
                <CityTab
                    city={'Mexico'}
                    temp={45}
                    bgImage={MexicoHomeBg}
                    feelTemp={45}
                    wind={45}
                    precip={24}
                ></CityTab>
                <CityTab
                    city={'Mexico'}
                    temp={45}
                    bgImage={MexicoHomeBg}
                    feelTemp={45}
                    wind={45}
                    precip={24}
                ></CityTab>
                <CityTab
                    city={'Mexico'}
                    temp={45}
                    bgImage={MexicoHomeBg}
                    feelTemp={45}
                    wind={45}
                    precip={24}
                ></CityTab>
                <CityTab
                    city={'Mexico'}
                    temp={45}
                    bgImage={MexicoHomeBg}
                    feelTemp={45}
                    wind={45}
                    precip={24}
                ></CityTab>
                <CityTab
                    city={'Mexico'}
                    temp={45}
                    bgImage={MexicoHomeBg}
                    feelTemp={45}
                    wind={45}
                    precip={24}
                ></CityTab>
                <CityTab
                    city={'Mexico'}
                    temp={45}
                    bgImage={MexicoHomeBg}
                    feelTemp={45}
                    wind={45}
                    precip={24}
                ></CityTab>
                <CityTab
                    city={'Mexico'}
                    temp={45}
                    bgImage={MexicoHomeBg}
                    feelTemp={45}
                    wind={45}
                    precip={24}
                ></CityTab>
                <CityTab
                    city={'Mexico'}
                    temp={45}
                    bgImage={MexicoHomeBg}
                    feelTemp={45}
                    wind={45}
                    precip={24}
                ></CityTab>
                <CityTab
                    city={'Mexico'}
                    temp={45}
                    bgImage={MexicoHomeBg}
                    feelTemp={45}
                    wind={45}
                    precip={24}
                ></CityTab>
                <CityTab
                    city={'Mexico'}
                    temp={45}
                    bgImage={MexicoHomeBg}
                    feelTemp={45}
                    wind={45}
                    precip={24}
                ></CityTab>
                <CityTab
                    city={'Mexico'}
                    temp={45}
                    bgImage={MexicoHomeBg}
                    feelTemp={45}
                    wind={45}
                    precip={24}
                ></CityTab>
                <CityTab
                    city={'Mexico'}
                    temp={45}
                    bgImage={MexicoHomeBg}
                    feelTemp={45}
                    wind={45}
                    precip={24}
                ></CityTab>
                <CityTab
                    city={'Mexico'}
                    temp={45}
                    bgImage={MexicoHomeBg}
                    feelTemp={45}
                    wind={45}
                    precip={24}
                ></CityTab>
            </Box>
        </Box>
    );
}