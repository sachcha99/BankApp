import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import NavBar from './NavBar'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import AddBoxIcon from '@mui/icons-material/AddBox';
import BgImage from './images/bg-img.jpg'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
const Alert = React.forwardRef(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <span color="inherit" >
        Bank App
      </span>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const theme = createTheme();

const Home = () => {
  let navigate = useNavigate();
  const [userDetails, setUserDetails] = useState()
  const [personalDetails, setPersonalDetails] = useState({
    firstName: "",
    lastName: "",
    nic: "",
    phone: "",
    bank: "",
    accNo: "",
    amount: "",
    remarks: ""
  })
  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [open, setOpen] = React.useState(false);
  let bankNames = ['Sampath Bank', 'Commercial Bank', 'Peoples Bank', 'BOC', 'NSB', 'HNB', 'NDB', 'NTB']

  const handleChangeInput = e => {
    const { name, value } = e.target;
    setPersonalDetails({ ...personalDetails, [name]: value });
  };

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    setUserDetails(user)
    if (!user) {
      navigate('/login')
    }
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (personalDetails.firstName && personalDetails.lastName && personalDetails.nic && personalDetails.phone && personalDetails.bank && personalDetails.accNo && personalDetails.amount) {
      let body = {
        firstName: personalDetails.firstName,
        lastName: personalDetails.lastName,
        nic: personalDetails.nic,
        phone: personalDetails.phone,
        bank: personalDetails.bank,
        accNo: personalDetails.accNo,
        amount: personalDetails.amount,
        remarks: personalDetails.remarks
      }
      try {
        const result = await axios.post(`http://localhost:5000/fundTransfer/create`, body)
        setPersonalDetails({
          firstName: "",
          lastName: "",
          nic: "",
          phone: "",
          bank: "",
          accNo: "",
          amount: "",
          remarks: ""
        })
        handleClick();
      } catch (error) {
        console.log(error)
      }
    } else {
      setErrorMsg("Please Fill all fields")
      handleError()
    }
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleError = () => {
    setError(true);
  };

  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError(false);
  };

  return (
    <>
      <NavBar user={userDetails} />
      <div style={{
        paddingTop: '50px',
        backgroundImage: `url(${BgImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100%',
      }}>
        <ThemeProvider theme={theme} >
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Fund Transfer Successful!
            </Alert>
          </Snackbar>
          <Snackbar open={error} autoHideDuration={6000} onClose={handleCloseError}>
            <Alert onClose={handleCloseError} severity="error">{errorMsg}</Alert>
          </Snackbar>
          <Container component="main" maxWidth="xs" style={{}}>
            <CssBaseline />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#ffffffde',
                paddingInline: '10px',
                borderRadius: '8px',
                borderColor: '#808080',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'blue' }}>
                <CurrencyExchangeIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Send Money
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Typography style={{ marginBottom: '15px' }} component="h2" variant="h6">
                  Receiver Personal Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      value={personalDetails.firstName}
                      onChange={handleChangeInput}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      value={personalDetails.lastName}
                      onChange={handleChangeInput}
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      fullWidth
                      id="nic"
                      label="NIC"
                      name="nic"
                      autoComplete="nic"
                      value={personalDetails.nic}
                      onChange={handleChangeInput}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      type='number'
                      required
                      fullWidth
                      id="phone"
                      label="Phone No"
                      name="phone"
                      autoComplete="phone"

                      value={personalDetails.phone}
                      onChange={handleChangeInput}
                    />
                  </Grid>
                  <Typography style={{ marginBlock: '15px', marginInline: '15px' }} component="h2" variant="h6">
                    Receiver Bank Details
                  </Typography>
                  <Grid item xs={12} >
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Bank</InputLabel>
                      <Select
                        required
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={personalDetails.bank}
                        label="Bank"
                        name="bank"
                        onChange={handleChangeInput}
                      >
                        {bankNames && bankNames.map((bank, i) => (
                          <MenuItem key={i} value={bank}>{bank}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      fullWidth
                      id="accNo"
                      label="Account No"
                      name="accNo"
                      autoComplete="accNo"
                      type='number'
                      value={personalDetails.accNo}
                      onChange={handleChangeInput}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                    <OutlinedInput
                      required
                      fullWidth
                      id="amount"
                      label="Amount"
                      name="amount"
                      autoComplete="amount"
                      type='number'
                      value={personalDetails.amount}
                      onChange={handleChangeInput}
                      startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      id="remarks"
                      label="Remarks"
                      name="remarks"
                      autoComplete="remarks"
                      value={personalDetails.remarks}
                      onChange={handleChangeInput}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Container>
        </ThemeProvider>
      </div>
    </>
  )
}

export default Home