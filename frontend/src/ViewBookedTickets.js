import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {
    Box,
    Button, 
    Container,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Typography,
    IconButton
} from '@material-ui/core'
import axios from 'axios'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import DeleteIcon from '@material-ui/icons/Delete'
const JSONbig = require('json-bigint')({storeAsString: true})

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

    useEffect(() => {
        fetchTickets()
    },[])

    let listOfTickets = []
    let mapTicketToShow= {}
    for (const ticket of tickets){
        for(const show of shows){
            if(show.id === ticket.showId){
                listOfTickets.push(ticket)
                mapTicketToShow[ticket.id] = show
            }
        }
    }
    console.log(tickets)
    return (
        <Container>
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
                        <Table>
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
                                {listOfTickets.map((ticket) => (
                                    <TableRow key={ticket.id}>
                                        <TableCell component="th" scope="row">
                                            {mapTicketToShow[ticket.id].name}
                                        </TableCell>
                                        <TableCell align="right">{ticket.type}</TableCell>
                                        <TableCell align="right">{mapTicketToShow[ticket.id].time}</TableCell>
                                        <TableCell align="right">{mapTicketToShow[ticket.id].date}</TableCell>
                                        <TableCell align="right">
                                            <IconButton color="secondary" onClick={() => handleClickOpen(ticket.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                            <Dialog
                                                open={open}
                                                onClose={handleClose}
                                            >
                                                <DialogTitle>{'Are you sure?'}</DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText>
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