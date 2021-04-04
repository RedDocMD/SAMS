import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Container, Grid, IconButton, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import axios from 'axios'
const JSONbig = require('json-bigint')({ storeAsString: true })
import collect from 'collect.js'
import DeleteIcon from '@material-ui/icons/Delete'
import assert from 'assert'

function ViewSalesperson(props) {
    const CurrViewEnum = Object.freeze({
        table: 1,
        list: 2
    })

    const [salespersons, setSalespersons] = useState([])
    const [transactionMap, setTransactionMap] = useState({})
    const [currViewState, setCurrViewState] = useState(CurrViewEnum.table)
    const [chosenId, setChosenId] = useState()

    useEffect(() => {
        (async () => {
            try {
                const url = `${props.baseURL}/users`
                const response = await axios.get(url, {transformResponse: data => data})
                const users = JSONbig.parse(response.data)
                const salespersons = users.filter(user => user.type === 'Salesperson')
                setSalespersons(salespersons)
                let theMap = {}
                for (const salesperson of salespersons) {
                    const newUrl = `${props.baseURL}/transactions/by_salesperson/${salesperson.id}`
                    const newResponse = await axios.get(newUrl, {transformResponse: data => data})
                    const transactions = JSONbig.parse(newResponse.data)
                    theMap[salesperson.id] = transactions
                }
                setTransactionMap(theMap)
            } catch (e) {
                console.error(e)
                setSalespersons([])
                setTransactionMap({})
            }
        })()
    }, [])

    const transactionList = id => {
        if (!id) {
            return ''
        }
        let salesperson = undefined
        for (const i of salespersons) {
            if (i.id === id) {
                salesperson = i
                break
            }
        }
        assert(salesperson)
        const transactions = transactionMap[id]
        const table =        
        <TableContainer component={Paper}>
            <Table>
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
        return (
            <Container>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Box mt={3}>
                            <Typography variant='h4' align='center'>
                                {`All Transactions of "${salesperson.username}"`}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={3} />
                    <Grid item xs={6}>
                        {table}
                    </Grid>
                    <Grid item xs={3} />
                    <Grid item xs={3} />
                    <Grid item xs={6}>
                        <Box display='flex' justifyContent='center'>
                            <Button variant='contained' color='primary' onClick={() => setCurrViewState(CurrViewEnum.table)}>Back</Button>
                        </Box>
                    </Grid>
                    <Grid item xs={3} />
                </Grid>
            </Container>
        )
    }
    const showAllTransactionsHandler = id => {
        setCurrViewState(CurrViewEnum.list)
        setChosenId(id)
    }

    const salespersonItems = salespersons.map(salesperson => {
        const transactions = collect(transactionMap[salesperson.id])
        const totalMoney = transactions.reduce((carry, item) => carry + item.amount, 0)
        const totalTickets = transactions.count()
        const name = salesperson.username
        return (
            <TableRow key={salesperson.id}>
                <TableCell>{name}</TableCell>
                <TableCell align='right'>{totalTickets}</TableCell>
                <TableCell align='right'>{`₹ ${totalMoney}`}</TableCell>
                <TableCell align='center'>
                    <Button variant='contained' color='primary' onClick={() => showAllTransactionsHandler(salesperson.id)}>All Transactions</Button>
                </TableCell>
                <TableCell align='center'>
                    <IconButton color='secondary'>
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
        )
    })

    const tableView =     
        <Container>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Box mt={3}>
                        <Typography variant='h4' align='center'>
                            Salespersons
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={2} />
                <Grid item xs={8}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Box component='span' fontWeight='fontWeightBold'>Username</Box>
                                    </TableCell> 
                                    <TableCell align='right'>
                                        <Box component='span' fontWeight='fontWeightBold'>Tickets sold</Box>
                                    </TableCell> 
                                    <TableCell align='right'>
                                        <Box component='span' fontWeight='fontWeightBold'>Money earned</Box>
                                    </TableCell>
                                    <TableCell />
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {salespersonItems}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={2} />
            </Grid>
        </Container>

    const listView = transactionList(chosenId)

    let currView = undefined
    switch (currViewState) {
    case CurrViewEnum.list:
        currView = listView
        break    
    case CurrViewEnum.table:
        currView = tableView
        break
    default:
        throw new Error('Inconsistent state in ViewSalesperson.js')
    }

    return currView
}

ViewSalesperson.propTypes = {
    baseURL: PropTypes.string.isRequired,
    callback: PropTypes.func.isRequired
}

export default ViewSalesperson