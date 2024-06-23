import React, { useEffect } from "react";
import { Box, Button, MenuItem, TextField } from "@mui/material";
import { axiosInstance } from "../axios/index.tsx";
import { Account, AccountCreate } from "../types/Account.ts";
import type { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { CustomModal } from "../components/customModal";
import { enqueueSnackbar } from "notistack";
import { LogoBar } from "../components/topbar.tsx"
import '../css/admin.css'

const emptyForm: AccountCreate = {
    name: '',
    mail: '',
    password: '',
    role: 'sales',
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
        <Box flex={1} flexDirection={'column'}>
            <LogoBar title="Admin" backbutton />
            <Box className={"dataGridBox"}>
                <DataGrid
                    rows={accounts}
                    columns={columns}
                    className={"dataGrid2"}
                    getRowId={(row) => row.name}
                    initialState={{
                        sorting: {
                            sortModel: [{ field: 'id', sort: 'asc' }],
                        },
                    }}
                >
                </DataGrid>

            </Box>

            <CustomModal
                open={openAccount}
                title="Add new account"
                setOpen={setOpenAccount}
                onSubmit={(event)=> {
                    event.preventDefault();
                    createAccount();
                }}
            >
                <TextField
                    sx={{ width: '80%', margin: '20px' }}
                    label="Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                >
                </TextField>

                <TextField
                    sx={{ width: '80%', margin: '20px' }}
                    label="Mail"
                    name="mail"
                    value={form.mail}
                    onChange={handleChange}
                >
                </TextField>

                <TextField
                    sx={{ width: '80%', margin: '20px' }}
                    label="Password"
                    type="password"
                    name="password"
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
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="sales">Sales</MenuItem>
                    <MenuItem value="research">Research</MenuItem>
                </TextField>

            </CustomModal>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    className={"accountButton"}
                    sx={{ backgroundColor: 'green', mt: 2, '&:hover': { backgroundColor: 'darkgreen' }, color: 'white' }}
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