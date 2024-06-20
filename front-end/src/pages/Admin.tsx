import React, { useEffect } from "react";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { CustomModal } from "../components/customModal";
import { enqueueSnackbar } from "notistack";
import { axiosInstance } from "../axios/index.tsx";
import { AccountCreate, Account } from "../types/Account.ts";
import { LogoBar } from "../components/topbar.tsx";
import '../css/admin.css'


const emptyForm: AccountCreate = {
    name: '',
    mail: '',
    password: '',
    role: '',
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
            field: 'name', flex: 1, headerName: 'Name',
        },
        {
            field: 'mail', flex: 1, headerName: 'E-mail',
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
        <Box>
            <LogoBar title={'admin'} backbutton />
            <Box className={'accounts'}>
                <DataGrid
                    className="dataGrid"
                    rows={accounts}
                    columns={columns}
                    getRowId={(row) => row.name}
                    initialState={{
                        sorting: {
                            sortModel: [{ field: 'name', sort: 'asc' }],
                        },
                    }}
                >
                </DataGrid>
                <CustomModal
                    open={openAccount}
                    title="Add new account"
                    setOpen={setOpenAccount}
                    onSubmit={createAccount}
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
                        value={form.mail}
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
                        <MenuItem value="sales">Sales</MenuItem>
                        <MenuItem value="research">Research</MenuItem>
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
            </Box>

        </Box>
    )
}