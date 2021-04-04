import {Box, Button, Typography, Container, Grid} from '@material-ui/core'
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import JSONbig from 'json-bigint'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
})


function ViewShowStats(props) {
    let createHandler = () => {
        props.callback()
    }
    const classes = useStyles()

    let [tickets, setTickets] = useState([])
    let [transactions, setTransactions] = useState([])

    useEffect(() => {
        const fetchTickets = async () => {
            try{
                console.log(props.show)
                let url =  `${props.baseURL}/tickets/by_show/${props.show.id}`
                setTickets([])
                const response = await axios.get(url,{transformResponse: data => data})
                const json = JSONbig.parse(response.data)
                setTickets(json)
                url = `${props.baseURL}/transactions/by_show/${props.show.id}`
                const response1 = await axios.get(url,{transformResponse: data => data})
                const json1 = JSONbig.parse(response1.data)
                setTransactions(json1)
            }catch (e){
                setTickets([])
            }
        }
        fetchTickets()
    },[])
    let findCount = (flag) => {
        let cnt = 0
        for (const i in tickets){
            if (flag === 0 && tickets[i].type === 'Regular'){
                cnt++
            }
            if (flag === 1 && tickets[i].type === 'Balcony'){
                cnt++
            }
        }
        return cnt
    }
    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Box mt={3}>
                        <Typography variant="h4" align="center">
                            Show Stats
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={2} />
                <Grid item xs={4}>
                    Number of Regular Seats Booked : {findCount(0)}
                </Grid>
                <Grid item xs={4}>
                    Percentage of Regular Seats Booked : {props.show.regularTicketCount === 0 ? 0 : findCount(0) / props.show.regularTicketCount * 100}%
                </Grid>
                <Grid item xs={2} />
                <Grid item xs={2} />
                <Grid item xs={4}>
                    Number of Balcony Seats Booked : {findCount(1)}
                </Grid>
                <Grid item xs={4}>
                    Percentage of Balcony Seats Booked : {props.show.balconyTicketCount === 0 ? 0 : findCount(1) / props.show.balconyTicketCount * 100}%
                </Grid>
                <Grid item xs={2} />
                <Grid item xs={12}>
                    <Box mt={3}>
                        <Typography variant="h6" align="center">
                            Balance Sheet
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs = {12}>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Type</TableCell>
                                    <TableCell align="right">Time</TableCell>
                                    <TableCell align="right">Amount</TableCell>
                                    <TableCell align="right">Initiator</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transactions.map((transaction) => (
                                    <TableRow key={transaction.id}>
                                        <TableCell component="th" scope="row">
                                            {transaction.type}
                                        </TableCell>
                                        <TableCell align="right">{transaction.time}</TableCell>
                                        <TableCell align="right">{transaction.amount}</TableCell>
                                        <TableCell align="right">{transaction.initiatorType}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={5} />
                <Grid item xs={2} mt={3}>
                    <Button fullWidth variant="contained" color="primary" onClick={createHandler}>Go Back</Button>
                </Grid>
                <Grid item xs={5} />
            </Grid>
        </Container>

    )
}

ViewShowStats.propTypes = {
    baseURL: PropTypes.string.isRequired,
    callback: PropTypes.func.isRequired,
    show: PropTypes.object.isRequired,
}

export default ViewShowStats