import React, { useEffect } from "react";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import axiosInstance from "../axios";
import { Customer, CustomerCreate } from "../types";
import type { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";
import { CustomModal } from "../components/customModal";
import { enqueueSnackbar } from "notistack";
import {LogoutButton} from "../components/logoutButton.tsx";

const emptyForm: CustomerCreate = {
  name: '',
  email: '',
  phone: '',
}

export const Sales = () => {
  const [customers, setCustomers] = React.useState<Customer[]>([]);
  const [openCustomer, setOpenCustomer] = React.useState<boolean>(false);

  const [form, setForm] = React.useState<CustomerCreate>(emptyForm);

  const navigate = useNavigate();

  const createCustomer = () => {
    axiosInstance.post('/customer', form).then(() => {
      enqueueSnackbar('Customer created', { variant: 'success' });
      setOpenCustomer(false);
      axiosInstance.get<Customer[]>('/customer').then((response) => {
        setCustomers(response.data);
      });
    }).catch(() => {
      enqueueSnackbar('Failed to create customer', { variant: 'error' });
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
      field: 'subscription',
      flex: 1,
      headerName: 'Subscription',
      renderCell: (params) => (
        <>
          <Typography>{params.row.subscription ? "active" : "inactive"}</Typography>
          <IconButton
            onClick={() => navigate(`/customer/${params.row.id}`)}>
            <VisibilityIcon />
          </IconButton>
        </>
      )
    }
  ];

  useEffect(() => {
    axiosInstance.get<Customer[]>('/customer').then((response) => {
      setCustomers(response.data);
    });
  }, []);
  
  return (
    <Box flex={1} flexDirection={'column'} overflow={'hidden'} >
      <Box position={'absolute'}>
        <LogoutButton/>
      </Box>
      <Typography variant="h1" style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
        Sales
      </Typography>
      <Box height={'80vh'}>
        <DataGrid
          rows={customers}
          columns={columns}
          pagination
          sx={{ width: '80%', margin: 'auto' }}
          initialState={{
            sorting: { sortModel: [{ field: 'id', sort: 'asc' }] }, pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          sx={{ backgroundColor: 'green', color: 'white', width: '80%', borderRadius: '5px', margin: "auto", mt: 2, '&:hover': { backgroundColor: 'darkgreen' } }}
          onClick={() => {
            setOpenCustomer(!openCustomer);
          }}
        >
          Add new customer
        </Button>
      </Box>
      <CustomModal
        open={openCustomer}
        title="Add new customer"
        setOpen={setOpenCustomer}
        onSubmit={(createCustomer)}
      >
        <TextField
          sx={{ width: '80%', margin: '20px' }}
          label="Name"
          value={form.name}
          onChange={handleChange}
        />
        <TextField
          sx={{ width: '80%', margin: '20px' }}
          label="E-mail"
          value={form.email}
          onChange={handleChange}
        />
        <TextField
          sx={{ width: '80%', margin: '20px' }}
          label="Phone number"
          type='phone'
          value={form.phone}
          onChange={handleChange}
        />
      </CustomModal>
    </Box>
  )
}
