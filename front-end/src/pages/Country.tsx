import {Box, Typography} from "@mui/material";
import {MexicoHomeBg} from "../assets";
import {CityTab} from "../components/cityTab.tsx";
import {Graph} from "../components/graph.tsx";

export const Country = () => {
    const city = "Mexico";
    return (
        <Box>
            <Box class={'logoBar'}>
                <Typography variant={'h1'}>{city}</Typography>
            </Box>
            <Box class={'countryGraphBox'}>
                <Graph data={[2,5,6,7]}/>
                <Graph data={[5,5,4,7]}/>
                <Graph data={[3,5,6,7]}/>
                <Graph data={[2,53,6,7]}/>
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