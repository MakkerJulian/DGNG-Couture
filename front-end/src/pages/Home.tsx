import { Box } from "@mui/material";
import { AlaskaHomeBg, AmericaHomeBg, CoutureLogo, FranceHomeBg, FinlandHomeBg, GreenlandHomeBg, MexicoHomeBg, NorwayHomeBg, SpainHomeBg } from "../assets";
import '../css/home.css'
import { CountryTab } from "../components/countryTab";
import { getRole } from "../util/getrole";
import { LogoutButton } from "../components/logoutButton";

export const Home = () => {
    const role = getRole();
    return (
        <Box display={'flex'} flexDirection={'column'}>
            <Box className={'logoBar'}>
                <img src={CoutureLogo} className="logo"></img>
                <LogoutButton />
            </Box>
            <Box className={'homeContent'}>
                {role === "sales" ?
                    <>
                        <CountryTab country={'Mexico'} temp={28} bgImage={MexicoHomeBg} feelTemp={30} humidity={50} wind={15} precip={20} />
                        <CountryTab country={'France'} temp={19} bgImage={FranceHomeBg} feelTemp={29} humidity={80} wind={5} precip={10} />
                        <CountryTab country={'America'} temp={15} bgImage={AmericaHomeBg} feelTemp={16} humidity={20} wind={60} precip={100} />
                        <CountryTab country={'Spain'} temp={32} bgImage={SpainHomeBg} feelTemp={30} humidity={10} wind={10} precip={0} />
                    </>
                    :
                    <>
                        <CountryTab country={'Greenland'} temp={28} bgImage={GreenlandHomeBg} feelTemp={30} humidity={50} wind={15} precip={20} />
                        <CountryTab country={'Norway'} temp={19} bgImage={NorwayHomeBg} feelTemp={29} humidity={80} wind={5} precip={10} />
                        <CountryTab country={'Alaska'} temp={15} bgImage={AlaskaHomeBg} feelTemp={16} humidity={20} wind={60} precip={100} />
                        <CountryTab country={'Finland'} temp={32} bgImage={FinlandHomeBg} feelTemp={30} humidity={10} wind={10} precip={0} />
                    </>
                }
            </Box>
        </Box>
    );
};