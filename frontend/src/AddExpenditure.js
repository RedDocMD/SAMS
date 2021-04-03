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

function addExpenditure(props){
    //dummy
    let returnHandler = () => {
        props.callback()
    }

    let [showName,setShowName] = useState('')
    let [showid,setShowid] = useState('')
    let [amount,setAmount] = useState(0)
    let [reason,setReason] = useState('')
    let [open, setOpen] = useState(false)
    let [message,setMessage] = useState(0)
    let [shows,setShows] = useState([])

    let changeShowName = callerEvent => {
        setShowName(callerEvent.target.value.toString())

        for(let show of shows){
            let datetime = show.date.concat('T').concat(show.time)
            // console.log(datetime)
            // console.log(callerEvent.target.value)
            if(datetime === callerEvent.target.value){
                setShowid(bigIntToString(show.id))
                break
            }
        }
        setMessage(0)
    }

    let changeReason = callerEvent => {
        setReason(callerEvent.target.value)
        setMessage(0)
    }
    let changeAmount = callerEvent => {
        setAmount(parseInt(callerEvent.target.value))
        setMessage(0)
    }

    const handleClickOpen = () => {
        setOpen(true)
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

    useEffect(() => {
        fetchAllShows()
    },[])

    const submitAndClose = () => {
        setOpen(false)
        if(showid === '' || amount === 0.0 || reason === '') {
            setMessage(2)
            return
        }

        let data = {
            expenditure: {
                amount: amount,
                reason: reason,
                showId: (showid)
            },
            accountantId: props.accountantId,
        }
        console.log(data)
        axios.post(`${props.baseURL}/expenditures`,data)
            .then((response) =>{
                // console.log(response)
                console.log(data.showid)
                if(response.data)
                    setMessage(1)
                else
                    setMessage(2)
            }).catch((error)=>{
                // console.log(error)
                setMessage(2)
            })
    }

    const handleClose = () => {
        setOpen(false)
    }

    let getElement = (show)=>{
        let uKey = bigIntToString(show.id)
        // console.log(uKey)
        let datetime = show.date.concat('T').concat(show.time)
        return(
            <MenuItem value={datetime} key={uKey}>
                {datetime}
            </MenuItem>
        )
    }

    let alertMessage
    switch (message){
    case 0:
        alertMessage = ''
        break
    case 1:
        alertMessage = <Alert variant="filled" severity="success">
                Successfully Added Expenditure
        </Alert>
        break
    case 2:
        alertMessage = <Alert variant="filled" severity="error">
                You entered invalid data.
        </Alert>
        break
    default:
        throw Error('Invalid state in Add expenditure')
    }

    let menuOfShows = shows.filter( (show)=>{
        let datetime = show.date.concat('T').concat(show.time)
        let showTime = new Date(datetime)
        let currentTime = new Date()
        // console.log(new Date(datetime))
        // console.log(currentTime)
        return showTime>=currentTime
    }).map( show => getElement(show))

    // console.log(shows)
    // console.log(listOfShows.length)
    // console.log(showid)
    // console.log(showName)

    return(
        <Container>
            <Grid container spacing={5} alignItems="center">
                <Grid item xs={3}>
                    <Alert severity="success">
                        <AlertTitle>
                            <Typography  variant="h5" >Welcome, {props.name}</Typography>
                        </AlertTitle>
                    </Alert>
                </Grid>

                <Grid item xs={6}>
                    <Typography variant="h3" align="center">Add an Expenditure</Typography>
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
                    <Typography variant="h6" align="right">Enter Amount : </Typography>
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth id="outlined-basic" label="Amount" variant="outlined" onChange={changeAmount}/>
                </Grid>
                <Grid item xs={2} />

                <Grid item xs={4}>
                    <Typography variant="h6" align="right">Give Reason : </Typography>
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth id="outlined-basic" label="Reason" variant="outlined" onChange={changeReason}/>
                </Grid>
                <Grid item xs={2} />

                <Grid item xs={4} />
                <Grid item xs={2}>
                    <Button size="large" variant="contained" color="primary" onClick={returnHandler}>Log Out</Button>
                </Grid>
                <Grid item xs={2}>
                    <Button size="large" variant="contained" color="primary" onClick={handleClickOpen}>Add</Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{'Are you sure?'}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Please confirm that you want to add this expenditure.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" onClick={handleClose} color="primary">
                                No, Take me Back
                            </Button>
                            <Button variant="contained" onClick={submitAndClose} color="primary" autoFocus>
                                Yes, I want to add
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

export default addExpenditure

