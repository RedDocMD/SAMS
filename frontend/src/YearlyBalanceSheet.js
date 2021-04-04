import React, {useEffect, useState} from 'react'
import {Accordion, AccordionDetails, Box, Button, Container, Grid, Typography} from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import axios from 'axios'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AccordionSummary from '@material-ui/core/AccordionSummary'
const JSONbig = require('json-bigint')({ storeAsString: true })

function yearlyBalanceSheet(props){

    let handleReturn = () =>{
        props.callback()
    }

    let [transactions,setTransactions] = useState([])
    let [shows,setShows] = useState([])
    let [idToShow,setIdToShow] =useState(new Map())

    // console.log(idToShow)

    const fetchAllShows = async () => {
        try{
            let url =  `${props.baseURL}/shows`
            const response = await axios.get(url, {transformResponse : data => data })
            const json = JSONbig.parse(response.data)
            setShows(json)
            for(let show of json){
                setIdToShow(idToShow.set(show.id,show))
            }
        }catch (e){
            console.log(e)
        }
    }

    const fetchAllTransactions = async () => {
        try{
            let url =  `${props.baseURL}/transactions`
            const response = await axios.get(url, {transformResponse : data => data })
            const json = JSONbig.parse(response.data)
            setTransactions(json.filter( (transaction) => {
                let currentDate = new Date()
                let transactionDate = new Date(transaction.time)
                return currentDate.getFullYear() === transactionDate.getFullYear()
            }))
        }catch (e){
            console.log(e)
        }
    }

    useEffect(() => {
        fetchAllShows()
        fetchAllTransactions()
    },[])

    const columns = [
        { field: 'datetime', headerName: 'Date and Time',type: 'string', flex: 6,  },
        { field: 'amount', headerName: 'Amount', type: 'number', flex: 3 },
        { field: 'type', headerName: 'Type', type: 'string', flex:3 },
        { field: 'initiator', headerName: 'Initiator', type: 'string',  flex:3 },
        { field: 'showName', headerName: 'Name of Show', type: 'string',  flex: 5 },
    ]

    let rows = []
    let credit = 0,debit = 0, ticketsSold = 0
    for(let transaction of transactions){
        let data = {
            datetime: (new Date(transaction.time).toLocaleString()),
            amount: transaction.amount,
            type: transaction.type,
            initiator: transaction.initiatorType,
            showName: idToShow.get(transaction.showId).name,
            id: transaction.id
        }
        if(data.type === 'Credit'){
            credit += data.amount
            ticketsSold++
        }
        else
            debit += data.amount
        rows.push(data)
    }

    return(
        <Container style={{ height: 400, width: '100%' }}>
            <Grid container spacing={4}>
                <Grid item xs={4}/>
                <Grid item xs={4}>
                    <Box mt={2}>
                        <Typography variant="h4">
                            Annual Balance Sheet
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={4}/>

                <Grid item xs = {8}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography >Annual Summary</Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{backgroundColor:'rgba(112, 88, 209,0.75)'}}>
                            <Grid container spacing={1}>
                                <Grid item xs={2}/>
                                <Grid item xs={4}>
                                    <Typography>
                                            Total Income: ₹{credit}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography>
                                        Total Expense: ₹{debit}
                                    </Typography>
                                </Grid>
                                <Grid item xs={2}/>

                                <Grid item xs={2}/>
                                <Grid item xs={4}>
                                    <Typography>
                                        Net balance: ₹{credit-debit}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography>
                                        Total Tickets sold: {ticketsSold}
                                    </Typography>
                                </Grid>
                                <Grid item xs={2}/>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Grid>

                <Grid item xs={2}/>
                <Grid item xs={2}>
                    <Button variant="contained" color="secondary" onClick={handleReturn}>Go back</Button>
                </Grid>
                <Grid item xs={12} />
            </Grid>

            <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5,10,20,50,100]}/>
           
        </Container>
    )
}

export default yearlyBalanceSheet