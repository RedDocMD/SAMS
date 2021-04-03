import React, {useEffect, useState} from 'react'
import {
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
import {Alert, AlertTitle} from '@material-ui/lab'
import JSONbig from 'json-bigint'

const bigIntToString = num => {
    const parts = num.c
    let res = ''
    for (const part of parts) {
        res = res.concat(part.toString())
    }
    return res
}

function bookTicket(props){
    //dummy
    let returnHandler = () => {
        props.callback()
    }

    let [users,setUsers] = useState([])
    let [userName,setUsername] = useState('')
    let [userId,setUserId] = useState('')
    let [shows,setShows] = useState([])
    let [showName,setShowName] = useState('')
    let [showId,setShowId] = useState('')
    let [numTickets,setNumTickets] = useState(0)
    let [ticketPrice,setTicketPrice] = useState([0,0]) // balcony then regular
    let [selectedTicketPrice,setSelectedTicketPrice] = useState(0)
    let [ticketType,setTicketType] = useState('')
    let [open, setOpen] = useState(false)
    let [message,setMessage] = useState(0)

    let changeShowName = (callerEvent) => {
        setShowName(callerEvent.target.value.toString())

        for(let show of shows){
            let datetime = show.date.concat('T').concat(show.time)
            // console.log(datetime)
            // console.log(callerEvent.target.value)
            if(callerEvent.target.value.toString().includes(new Date(datetime).toString())){
                setShowId(bigIntToString(show.id))
                setTicketPrice([show.balconyTicketPrice,show.regularTicketPrice])
                if(ticketType === 'Regular'){
                    setSelectedTicketPrice(ticketPrice[1])
                }
                else{
                    setSelectedTicketPrice(ticketPrice[0])
                }
                break
            }
        }
        setMessage(0)
    }

    let changeUsername = callerEvent => {
        setUsername(callerEvent.target.value.toString())
        for(let user of users){
            if(callerEvent.target.value.toString() === user.username){
                setUserId(bigIntToString(user.id))
                return
            }
        }
        setMessage(0)
    }
    let changeNumTickets = callerEvent => {
        setNumTickets(parseInt(callerEvent.target.value))
        setMessage(0)
    }
    let changeTicketType = callerEvent => {
        setTicketType(callerEvent.target.value)
        if(callerEvent.target.value.toString() === 'Regular'){
            setSelectedTicketPrice(ticketPrice[1])
        }
        else{
            setSelectedTicketPrice(ticketPrice[0])
        }
        setMessage(0)
    }

    const fetchAllShows = async () => {
        try{
            let url =  `${props.baseURL}/shows`
            setShows([])
            const response = await axios.get(url, {transformResponse : data => data })
            const json = JSONbig.parse(response.data)
            setShows(json)
        }catch (e){
            setShows([])
        }
    }

    const fetchAllUsers = async () => {
        try{
            let url =  `${props.baseURL}/users`
            setUsers([])
            const response = await axios.get(url, {transformResponse : data => data })
            const json = JSONbig.parse(response.data)
            setUsers(json)
        }catch (e){
            setUsers([])
        }
    }

    let getElement = (show)=>{
        let uKey = bigIntToString(show.id)
        let datetime = show.date.concat('T').concat(show.time)
        // console.log(uKey)
        let showString = `${show.name} on ${new Date(datetime).toString()}`
        return(
            <MenuItem value={showString} key={uKey}>
                {showString}
            </MenuItem>
        )
    }

    let getUser = (user)=>{
        let uKey = bigIntToString(user.id)
        return(
            <MenuItem value={user.username} key={uKey}>
                {user.username}
            </MenuItem>
        )
    }

    useEffect(() => {
        fetchAllShows()
        fetchAllUsers()
    },[])


    const handleClickOpen = () => {
        setOpen(true)
    }

    const submitAndClose = () => {
    //     if(showId.length === 0 || amount === 0.0 || reason.length === 0) {
    //         setMessage(2)
    //         return
    //     }
        let data = {
            ticket: {
                showId: showId,
                type: ticketType,
                price: selectedTicketPrice,
                userId: userId
            },
            salespersonId: props.salespersonId
        }
        for(let i=0;i<numTickets;i++)
        {
            axios.post(`${props.baseURL}/tickets`,data)
                .then((response) =>{
                    if(response.data !== '' )
                        setMessage(1)
                    else
                        setMessage(2)
                }).catch((error)=>{
                    console.log(error)
                    setMessage(2)
                })

        }
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
                Successfully generated ticket.
        </Alert>
        break
    case 2:
        alertMessage = <Alert variant="filled" severity="error">
                Either Tickets are sold out or invalid request.
        </Alert>
        break
    default:
        throw Error('Invalid state in Create Account')
    }

    // console.log(shows)
    let menuOfShows = shows.filter( (show)=>{
        let datetime = show.date.concat('T').concat(show.time)
        let showTime = new Date(datetime)
        let currentTime = new Date()
        // console.log(new Date(datetime))
        // console.log(currentTime)
        return showTime>=currentTime
    }).map( show => getElement(show))

    let menuOfUsers = users.filter( (user) =>{
        return user.type === 'Customer'
    } ).map( user => getUser(user))

    return(
        <Container>
            <Grid container spacing={6} alignItems="center">
                <Grid item xs={3}>
                    <Alert severity="success">
                        <AlertTitle>
                            <Typography variant="h5" align="center">Welcome, {props.name}</Typography>
                        </AlertTitle>
                    </Alert>
                </Grid>

                <Grid item xs={6}>
                    <Typography variant="h3" align="center">Book a Ticket</Typography>
                </Grid>

                <Grid item xs={3}/>


                <Grid item xs={4}>
                    <Typography variant="h6" align="right">Select a show: </Typography>
                </Grid>

                <Grid item xs={6} >
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="demo-simple-select-outlined-label">Shows</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={showName}
                            onChange={changeShowName}
                            label="Shows"
                        >
                            <MenuItem value="">
                                <em>Select One Show</em>
                            </MenuItem>
                            {menuOfShows}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2} />

                <Grid item xs={4}>
                    <Typography variant="h6" align="right">Select a Customer: </Typography>
                </Grid>

                <Grid item xs={6} >
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="demo-simple-select-outlined-label">Select Customer</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={userName}
                            onChange={changeUsername}
                            label="Select Customer"
                        >
                            <MenuItem value="">
                                <em>Select One Cutomer</em>
                            </MenuItem>
                            {menuOfUsers}
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
                                Please confirm that you want to book? It will cost you Rs.{selectedTicketPrice*numTickets}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" onClick={handleClose} color="primary">
                                No, Take me Back
                            </Button>
                            <Button variant="contained" onClick={submitAndClose} color="primary" autoFocus>
                                Yes, I want to book
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

