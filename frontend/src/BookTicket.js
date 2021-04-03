import React, {useState} from 'react'
import {
    Box,
    Button,
    Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@material-ui/core'
import axios from 'axios'
import {Alert} from '@material-ui/lab'


function bookTicket(props){
    //dummy
    let returnHandler = () => {
        props.callback()
    }

    let [username,setUsername] = useState('')
    let [showname,setShowname] = useState('')
    let [numTickets,setNumTickets] = useState(0)
    let [ticketType,setTicketType] = useState('')
    let [open, setOpen] = useState(false)
    let [message,setMessage] = useState(0)


    let changeShowname = callerEvent => {
        setShowname(callerEvent.target.value)
        setMessage(0)
    }

    let changeUsername = callerEvent => {
        setUsername(callerEvent.target.value)
        setMessage(0)
    }
    let changeNumTickets = callerEvent => {
        setNumTickets(parseInt(callerEvent.target.value))
        setMessage(0)

    }
    let changeTicketType = callerEvent => {
        setTicketType(callerEvent.target.value)
        setMessage(0)
    }

    const handleClickOpen = () => {
        setOpen(true)
    }



    const submitAndClose = () => {
        // let data = {
        //     username : username,
        //     password : password,
        //     type : ticketType
        // }
        // axios.post(`${props.baseURL}/users`,data)
        //     .then((response) =>{
        //         console.log(response)
        //         if(response.data !== '' )
        //             setMessage(1)
        //         else
        //             setMessage(2)
        //     }).catch((error)=>{
        //         console.log(error)
        //         setMessage(2)
        //     })

        setOpen(false)
    }

    const handleClose = () => {
        setOpen(false)
    }

    let alertMessage
    switch (message){
    case 0:
        alertMessage = ''
        break
    case 1:
        alertMessage = <Alert variant="filled" severity="success">
                Successfully created Account
        </Alert>
        break
    case 2:
        alertMessage = <Alert variant="filled" severity="error">
                Invalid Data or Username already exists.
        </Alert>
        break
    default:
        throw Error('Invalid state in Create Account')
    }


    return(
        <Container>
            <Grid container spacing={6} alignItems="center">
                <Grid item xs={12}>
                    <Typography variant="h3" align="center">Book A Ticket</Typography>
                </Grid>

                <Grid item xs={4}>
                    <Typography variant="h6" align="right">Select a show: </Typography>
                </Grid>

                <Grid item xs={6} >
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="demo-simple-select-outlined-label">Shows</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={showname}
                            onChange={changeShowname}
                            label="Shows"
                        >
                            <MenuItem value="">
                                <em>Select One Show</em>
                            </MenuItem>
                            <MenuItem value={'a'}>a</MenuItem>
                            <MenuItem value={'b'}>b</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2} />

                <Grid item xs={4}>
                    <Typography variant="h6" align="right">Select Customer: </Typography>
                </Grid>

                <Grid item xs={6} >
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="demo-simple-select-outlined-label">Select Customer</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={username}
                            onChange={changeUsername}
                            label="Select Customer"
                        >
                            <MenuItem value="">
                                <em>Select One Show</em>
                            </MenuItem>
                            <MenuItem value={'a'}>a</MenuItem>
                            <MenuItem value={'b'}>b</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2} />

                <Grid item xs={4}>
                    <Typography variant="h6" align="right">Enter Number of Tickets : </Typography>
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth id="outlined-basic" label="Number of Tickets" variant="outlined" onChange={changeNumTickets}/>
                </Grid>
                <Grid item xs={2} />

                <Grid item xs={4}>
                    <Typography variant="h6" align="right">Select your Seat choice : </Typography>
                </Grid>
                <Grid item xs={6}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="demo-simple-select-outlined-label">Ticket Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={ticketType}
                            onChange={changeTicketType}
                            label="Ticket Type"
                        >
                            <MenuItem value="">
                                <em>Select One</em>
                            </MenuItem>
                            <MenuItem value={'Regular'}>Regular</MenuItem>
                            <MenuItem value={'Balcony'}>Balcony</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2} />

                <Grid item xs={4} />
                <Grid item xs={2}>
                    <Button size="large" variant="contained" color="primary" onClick={returnHandler}>Log Out</Button>
                </Grid>
                <Grid item xs={2}>
                    <Button size="large" variant="contained" color="primary" onClick={handleClickOpen}>Book</Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{'Are you sure?'}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Please confirm that you want to create this account.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" onClick={handleClose} color="primary">
                                No, Take me Back
                            </Button>
                            <Button variant="contained" onClick={submitAndClose} color="primary" autoFocus>
                                Yes, I want to create
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
                <Grid item xs={4} />

                <Grid item xs={4} />
                <Grid item xs={4} >
                    {alertMessage}
                </Grid>
                <Grid item xs={4} />

            </Grid>
        </Container>
    )


}

export default bookTicket

