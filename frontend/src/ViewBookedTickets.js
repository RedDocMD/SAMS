import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {
    Box,
    Button, CardActions,
    Container,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Typography
} from '@material-ui/core'
import axios from 'axios'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import {makeStyles} from '@material-ui/core/styles'
const JSONbig = require('json-bigint')({storeAsString: true})

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
})



function ViewBookedTickets(props) {
    let [tickets, setTickets] = useState([])
    let [shows, setShows] = useState([])
    let [userId,setUserId] = useState('')
    let [open, setOpen] = useState(false)

    let goBackHandler = () => {
        props.callback()
    }

    const fetchTickets = async () => {
        try{
            let url =  `${props.baseURL}/tickets/by_user/${props.customerId}`
            setTickets([])
            const response = await axios.get(url,{transformResponse: data => data})
            const json = JSONbig.parse(response.data)
            setTickets(json)
            url = `${props.baseURL}/shows`
            setShows([])
            const response1 = await axios.get(url,{transformResponse: data => data})
            const json1 = JSONbig.parse(response1.data)
            setShows(json1)
        }catch (e){
            console.log(e)
            setTickets([])
        }
    }

    let handleDelete = async () => {
        let url = `${props.baseURL}/tickets/`
        url  = url.concat(userId)
        console.log(userId)
        // console.log(event)
        // console.log(bigId)
        console.log(url)
        await axios.delete(url)
            .then((response) => {
                // console.log(response.data)
                fetchTickets()
            } )
        setOpen(false)
    }

    const handleClickOpen = (id) => {
        setOpen(true)
        setUserId(id)
    }

    const handleClose = () => {
        setOpen(false)
    }


    const classes = useStyles()

    useEffect(() => {
        fetchTickets()
    },[])

    let listOfShows = []
    let mapShowToTicket = {}
    for (const ticket of tickets){
        for(const show of shows){
            if(show.id === ticket.showId){
                listOfShows.push(show)
                mapShowToTicket[show.id] = ticket
            }
        }
    }
    console.log(tickets)
    return (<Container>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Box mt={3}>
                    <Typography variant="h4" align="center">
                        View Tickets
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs = {12}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Show Name</TableCell>
                                <TableCell align="right">Seat Type</TableCell>
                                <TableCell align="right">Time</TableCell>
                                <TableCell align="right">Date</TableCell>
                                <TableCell align="right">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listOfShows.map((show) => (
                                <TableRow key={show.id}>
                                    <TableCell component="th" scope="row">
                                        {show.name}
                                    </TableCell>
                                    <TableCell align="right">{mapShowToTicket[show.id].type}</TableCell>
                                    <TableCell align="right">{show.time}</TableCell>
                                    <TableCell align="right">{show.date}</TableCell>
                                    <TableCell align="right">
                                        <Button variant="contained" color="secondary" size="small" onClick={() => handleClickOpen(mapShowToTicket[show.id].id)} >Delete Ticket </Button>
                                        <Dialog
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >
                                            <DialogTitle id="alert-dialog-title">{'Are you sure?'}</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                    Please confirm that you want to delete this account.
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions >
                                                <Button variant="contained" onClick={handleClose} color="primary">
                                                    No, Take me Back
                                                </Button>
                                                <Button variant="contained" onClick={handleDelete} color="secondary">
                                                    Yes, I want to delete
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={12}>
                <Box display = 'flex' justifyContent='center'>
                    <Button variant="contained" color="primary" onClick={goBackHandler}>
                        Go Back
                    </Button>
                </Box>
            </Grid>
        </Grid>
    </Container>
    )
}

ViewBookedTickets.propTypes = {
    baseURL: PropTypes.string.isRequired,
    customerId: PropTypes.string.isRequired,
    callback: PropTypes.func.isRequired,
}

export default ViewBookedTickets