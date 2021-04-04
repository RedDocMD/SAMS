import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Box, Button, Container, Grid, Typography} from '@material-ui/core'
import axios from 'axios'


function ViewBookedTickets(props) {
    let [tickets, setTickets] = useState([])

    let goBackHandler = () => {
        props.callback()
    }

    useEffect(() => {
        const fetchTickets = async () => {
            try{
                let url =  `${props.baseURL}/tickets/by_user/${props.customerId}`
                setTickets([])
                const response = await axios.get(url,{transformResponse: data => data})
                console.log(response.data)
                const json = JSONbig.parse(response.data)
                console.log(json)
                setTickets(json)
            }catch (e){
                console.log(e)
                setTickets([])
            }
        }
        fetchTickets()
    },[])

    console.log(tickets)
    return (<Container>
        <Grid container spacing={3}>
            <Grid item xs={3}>
                <Button variant="contained" color="primary" onClick={goBackHandler}>
                    Go Back
                </Button>
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