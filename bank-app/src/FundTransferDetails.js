import React, { useState, useEffect } from 'react'
import NavBar from './NavBar';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import BgImage from './images/bg-img.jpg'
import Snackbar from '@mui/material/Snackbar';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const FundTransferDetails = () => {

    const [userDetails, setUserDetails] = useState()
    const [fundTransferDetails, setFundTransferDetails] = useState()
    const [isLoading, setIsLoading] = useState(false)
    // const [open, setOpen] = React.useState(false);

    let navigate = useNavigate();

    const handleClose = () => {
        setIsLoading(false);
    };

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        setUserDetails(user)
        if (!user) {
            navigate('/login')
        }
    }, []);

    useEffect(() => {
        setIsLoading(true)
        getFundTransferDetails()
        async function getFundTransferDetails() {
            try {
                const result = await axios.get(`http://localhost:5000/fundTransfer/`)
                setFundTransferDetails(result.data)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
    }, []);

    return (
        <>
            <NavBar user={userDetails} />
            <div style={{
                backgroundImage: `url(${BgImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100%',
            }}>
                {isLoading ?
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={isLoading}
                        onClick={handleClose}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    :
                    <Box
                        sx={{
                            paddingTop: 8,
                            paddingBottom: 6,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        {fundTransferDetails && fundTransferDetails.map((fund, i) => (
                            <Card key={i} sx={{ minWidth: 700, maxWidth: 700, marginBottom: 5 }} >
                                <CardContent>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    }}>
                                        <Typography gutterBottom variant="h6" component="div">
                                            <span > Receiver's Personal Details </span>
                                        </Typography>
                                        <Typography variant="overline" color="text.secondary" style={{ position: "relative" }}>
                                            Transaction ID : {fund._id}
                                        </Typography>
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'space-evenly',
                                    }}>
                                        <Typography variant="body1" >
                                            <span style={{ fontWeight: 'bold' }}>Name</span> : {fund.firstName + " " + fund.lastName}
                                        </Typography>
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'space-evenly',
                                    }}>
                                        <Typography variant="body1" >
                                            <span style={{ fontWeight: 'bold' }}>NIC</span> : {fund.nic}
                                        </Typography>
                                        <Typography variant="body1" >
                                            <span style={{ fontWeight: 'bold' }}>Mobile</span> : {fund.phone}
                                        </Typography>
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        marginTop: '8px'
                                    }}>
                                        <Typography gutterBottom variant="h6" component="div">
                                            <span > Receiver's Bank Details </span>
                                        </Typography>
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'space-evenly',
                                    }}>
                                        <Typography variant="body1" >
                                            <span style={{ fontWeight: 'bold' }}>Bank</span> : {fund.bank}
                                        </Typography>
                                        <Typography variant="body1" >
                                            <span style={{ fontWeight: 'bold' }}>Account No</span> : {fund.accNo}
                                        </Typography>
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'space-evenly',
                                    }}>
                                        <Typography variant="body1" >
                                            <span style={{ fontWeight: 'bold' }}>Amount</span> : {fund.amount} $
                                        </Typography>
                                        {fund.remarks &&
                                            (<Typography variant="body1" >
                                                <span style={{ fontWeight: 'bold' }}>Remarks</span> : {fund.remarks}
                                            </Typography>)}
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>}
            </div>
        </>
    )
}

export default FundTransferDetails