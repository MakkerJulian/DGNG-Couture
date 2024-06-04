import {Box, Typography} from "@mui/material";
import {MexicoHomeBg} from "../assets";
import {CityTab} from "../components/cityTab.tsx";
import {DataGrid} from "@mui/x-data-grid";
import {Graph} from "../components/graph.tsx";

export const Country = () => {
    const city = "Mexico";
    return (
        <Box>
            <Box class={'logoBar'}>
                <Typography variant={'h1'}>{city}</Typography>
            </Box>
            <Box class={'countryGraphBox'}>
                <Box class={'graph'}>
                    <Typography variant={'h5'}>Graph blah blah</Typography>
                </Box>
                <Box class={'graph'}>
                    <Typography variant={'h5'}>Graph blah blah</Typography>
                </Box>
                <Box class={'graph'}>
                    <Typography variant={'h5'}>Graph blah blah</Typography>
                </Box>
                <Graph graphData={[2, 5, 7]}/>
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