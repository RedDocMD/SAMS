import React, {useEffect, useState} from 'react'
import axios from 'axios'
import JSONbig from 'json-bigint'
import PropTypes from 'prop-types'
import {Box, Button, Container, Grid, Typography} from '@material-ui/core'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
})



function ViewShowsUser(props) {
    let [shows, setShows] = useState([])

    let goBackHandler = () => {
        props.callback()
    }
    const classes = useStyles()

    useEffect(() => {
        const fetchShows = async () => {
            try{
                let url =  `${props.baseURL}/shows`
                setShows([])
                const response = await axios.get(url,{transformResponse: data => data})
                const json = JSONbig.parse(response.data)
                setShows(json.filter((show)=>{
                    let currDate = new Date()
                    let showDate = new Date(show.date.concat('T').concat(show.time))
                    return showDate>=currDate
                }))
            }catch (e){
                setShows([])
            }
        }
        fetchShows()
    },[])

    return(<Container>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Box mt={3} mb = {3}>
                    <Typography variant="h4" align="center">
                        Show Stats
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs = {12}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Show Name</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell align="right">Time</TableCell>
                                <TableCell align="right">Duration</TableCell>
                                <TableCell align="right">Regular Ticket Cost</TableCell>
                                <TableCell align="right">Balcony Ticket Cost</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {shows.map((show) => (
                                <TableRow key={show.id}>
                                    <TableCell align="left">{show.name}</TableCell>
                                    <TableCell component="th" scope="row">
                                        {new Date(show.date).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell align="right">{new Date(show.date.concat('T').concat(show.time)).toLocaleTimeString()}</TableCell>
                                    <TableCell align="right">{show.duration}</TableCell>
                                    <TableCell align="right">{show.regularTicketPrice}</TableCell>
                                    <TableCell align="right">{show.balconyTicketPrice}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={5} />
            <Grid item xs={2} mt={3}>
                <Box display='flex' justifyContent='center'>
                    <Button variant="contained" color="primary" onClick={goBackHandler}>Go Back</Button>
                </Box>
            </Grid>
            <Grid item xs={5} />
        </Grid>
    </Container>)
}

ViewShowsUser.propTypes = {
    baseURL: PropTypes.string.isRequired,
    callback: PropTypes.func.isRequired,
}

export default ViewShowsUser