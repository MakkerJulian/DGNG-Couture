import React, { useEffect } from "react";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { CustomModal } from "../components/customModal";
import { enqueueSnackbar } from "notistack";
import { axiosInstance } from "../axios/index.tsx";
import { AccountCreate, Account } from "../types/Account.ts";
import { LogoBar } from "../components/topbar.tsx";


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
            field: 'uuid', flex: 0.5, headerName: 'uuID',
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
            <LogoBar title={'admin'} backbutton />
            
            <DataGrid
                rows={accounts}
                columns={columns}
                getRowId={(row) => row.uuid}
                sx={{ maxWidth: '80%', margin: 'auto', height: '78vh' }}
                initialState={{
                    sorting: {
                        sortModel: [{ field: 'uuid', sort: 'asc' }],
                    },
                }}
            >
            </DataGrid>

            
        </Box>
    )
}