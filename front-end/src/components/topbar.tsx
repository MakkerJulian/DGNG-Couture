import { Box, Button, Typography } from '@mui/material';
import { LogoutButton } from './logoutButton';
import { CoutureLogo } from '../assets';
import { useNavigate } from 'react-router-dom';
import '../css/logobar.css';
import { getRole } from "../util/getrole";

type LogoBarProps = {
    title?: string;
    backbutton?: boolean;
}

const role = getRole();

export const LogoBar = ({ title, backbutton }: LogoBarProps) => {
    const nav = useNavigate();
    return (
        <Box className={'logoBar'}>
            {!title && <img src = {CoutureLogo} alt='Couture Logo' className='logo' />}
            <Typography variant={'h1'}>{title}</Typography>
            <Box className={'spacer'} >
                {backbutton && <Button className='customButton' onClick={()=>nav(-1)}>Back</Button>}
                <LogoutButton/>
                {role === 'admin' && <Button className='customButton' href='/admin'>Admin</Button>}
            </Box>
        </Box>
    )
}