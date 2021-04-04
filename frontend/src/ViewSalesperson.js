import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Container, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import axios from 'axios'
const JSONbig = require('json-bigint')({ storeAsString: true })
import collect from 'collect.js'
import DeleteIcon from '@material-ui/icons/Delete'

function ViewSalesperson(props) {
    const [salespersons, setSalespersons] = useState([])
    const [transactionMap, setTransactionMap] = useState({})

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

    let salespersonItems = salespersons.map(salesperson => {
        const transactions = collect(transactionMap[salesperson.id])
        const totalMoney = transactions.reduce((carry, item) => carry + item.amount, 0)
        const totalTickets = transactions.count()
        const name = salesperson.username
        return (
            <TableRow key={salesperson.id}>
                <TableCell>{name}</TableCell>
                <TableCell>{totalTickets}</TableCell>
                <TableCell>{`₹ ${totalMoney}`}</TableCell>
                <TableCell>
                    <Button variant='contained' color='primary'>All Transactions</Button>
                </TableCell>
                <TableCell>
                    <IconButton color='secondary'>
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
        )
    })

    return (
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
                                    <TableCell>Username</TableCell> 
                                    <TableCell>Tickets sold</TableCell> 
                                    <TableCell>Total credit</TableCell>
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
    )
}

ViewSalesperson.propTypes = {
    baseURL: PropTypes.string.isRequired,
    callback: PropTypes.func.isRequired
}

export default ViewSalesperson