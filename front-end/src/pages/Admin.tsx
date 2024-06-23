import React, { useEffect } from "react";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { CustomModal } from "../components/customModal";
import { enqueueSnackbar } from "notistack";
import { LogoutButton } from "../components/logoutButton.tsx";
import { axiosInstance } from "../axios/index.tsx";
import { AccountCreate, Account } from "../types/Account.ts";

const emptyForm: AccountCreate = {
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'Sales',
}

export const Admin = () => {
    const [accounts, setAccounts] = React.useState<Account[]>([]);
    const [openAccount, setOpenAccount] = React.useState<boolean>(false);
    const [form, setForm] = React.useState<AccountCreate>(emptyForm);
    const createAccount = () => {
        axiosInstance.post('/account', form).then(() => {
            enqueueSnackbar('Account created', { variant: 'success' });
            setOpenAccount(false);
            axiosInstance.get<Account[]>('/account').then((response) => {
                setAccounts(response.data);
            });
        }).catch(() => {
            enqueueSnackbar('Failed to create account', { variant: 'error' });
        });
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const columns: GridColDef[] = [
        {
            field: 'id', flex: 0.5, headerName: 'ID',
        },
        {
            field: 'name', flex: 1, headerName: 'Name',
        },
        {
            field: 'email', flex: 1, headerName: 'E-mail',
        },
        {
            field: 'phone', flex: 1, headerName: 'Phone number',
        },
        {
            field: 'role', flex: 1, headerName: 'Role',
        }

    ]

    useEffect(() => {
        axiosInstance.get<Account[]>('/account').then((response) => {
            setAccounts(response.data);
        });
    }, []);

    return (
        <Box flex={1} flexDirection={'column'}>
            <Box position={'absolute'}>
                <LogoutButton></LogoutButton>
            </Box>
            <Typography variant="h1" justifyContent={"center"} display={"flex"}>
                Admin
            </Typography>

            <DataGrid
                rows={accounts}
                columns={columns}
                sx={{ maxWidth: '80%', margin: 'auto', height: '78vh' }}
                initialState={{
                    sorting: {
                        sortModel: [{ field: 'id', sort: 'asc' }],
                    },
                }}
            >
            </DataGrid>

            <CustomModal
                open={openAccount}
                title="Add new account"
                setOpen={setOpenAccount}
                onSubmit={(event) => {
                    event.preventDefault();
                    createAccount();
                }}
            >
                <TextField
                    sx={{ width: '80%', margin: '20px' }}
                    label="Name"
                    value={form.name}
                    onChange={handleChange}
                >
                </TextField>

                <TextField
                    sx={{ width: '80%', margin: '20px' }}
                    label="E-mail"
                    value={form.email}
                    onChange={handleChange}
                >
                </TextField>


                <TextField
                    sx={{ width: '80%', margin: '20px' }}
                    label="Phone number"
                    type='phone'
                    value={form.phone}
                    onChange={handleChange}
                >
                </TextField>

                <TextField
                    sx={{ width: '80%', margin: '20px' }}
                    label="Password"
                    value={form.password}
                    onChange={handleChange}
                >
                </TextField>

                <TextField
                    sx={{ width: '80%', margin: '20px', color: "black" }}
                    label="Role"
                    value={form.role}
                    select
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                >
                    <MenuItem value="ADMIN">Admin</MenuItem>
                    <MenuItem value="Sales">Sales</MenuItem>
                    <MenuItem value="Onderzoek">Onderzoek</MenuItem>
                    <MenuItem value="Onderhoud">Onderhoud</MenuItem>
                </TextField>

            </CustomModal>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    sx={{ backgroundColor: 'green', color: 'white', width: '80%', borderRadius: '5px', margin: "auto", mt: 2, '&:hover': { backgroundColor: 'darkgreen' } }}
                    onClick={() => {
                        setOpenAccount(!openAccount);
                    }}
                >
                    Add new account
                </Button>
            </Box>
        </Box >
    )
}