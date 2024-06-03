import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { BG_Image, CoutureLogo } from '../assets';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { axiosInstance } from '../axios';

const emptyFrom = {
    mail: '',
    password: '',
}

export const Login = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [form, setForm] = useState(emptyFrom);

    const handlePost = async (event: React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault();
        await axiosInstance.post('/account/login', form)
            .then((res) => {
                const Login = res.data.access_token;
                if (Login) {
                    sessionStorage.setItem('token', Login);
                    enqueueSnackbar('Login success', { variant: 'success' })
                    return navigate('/home');
                } else {
                    enqueueSnackbar('Login failed', { variant: 'error' })
                }
            })
            .catch(() => {
                enqueueSnackbar('Login failed', { variant: 'error' })
            });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <Box
            sx={{
                alignItems: 'center',
                display: "flex",
                flexDirection: 'column',
                justifyContent: 'center',
                height: "100vh"
            }}>
            <img src={BG_Image} alt='logo' style={{
                display: "block",
                position: "absolute",
                width: "100%",
                height: "100%",
                zIndex: "-3",
                top: "0%",
                objectFit: "fill"
            }}></img>

            <form onSubmit={handlePost}>
                <Box
                    boxShadow={'0 0 10px rgba(0, 0, 0, 2)'}
                    borderRadius={'25px'}
                    margin={'auto'}
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                    sx={{
                        background: 'white',
                        '@media (max-width: 600px)': {
                            width: '80vw',
                        },
                        '@media (min-width: 601px) and (max-width: 1024px)': {
                            width: '60vw',
                        },
                        '@media (min-width: 1025px)': {
                            width: '20vw',
                        },
                    }}
                >
                    <Typography
                        variant={'h3'}
                        sx={{ margin: '20px' }}
                    >
                        Login
                    </Typography>

                    <TextField
                        sx={{ width: '50%', margin: '20px' }}
                        label="Email"
                        name='mail'
                        value={form.mail}
                        onChange={handleChange}
                    >
                    </TextField>

                    <TextField
                        name='password'
                        sx={{ width: '50%', margin: '20px' }}
                        label="Password"
                        type='password'
                        value={form.password}
                        onChange={handleChange}
                    >
                    </TextField>


                    <Button
                        type='submit'
                        sx={{ background: '#9a9cfb', color: 'white', width: "50%", margin: '20px' }}
                    >
                        Login
                    </Button>
                </Box>
            </form>

            <img src={CoutureLogo} alt='logo' style={{
                height: '30vh'
            }}></img>
        </Box>
    );

}