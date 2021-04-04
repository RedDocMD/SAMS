import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Container, Grid, Typography } from '@material-ui/core'
import axios from 'axios'
const JSONbig = require('json-bigint')({ storeAsString: true })

function ViewSalesperson(props) {
    const [salespersons, setSalespersons] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const url = `${props.baseURL}/users`
                const response = await axios.get(url, {transformResponse: data => data})
                const users = JSONbig.parse(response.data)
                const salespersons = users.filter(user => user.type === 'Salesperson')
                setSalespersons(salespersons)
            } catch (e) {
                console.error(e)
                setSalespersons([])
            }
        })()
    }, [])
    
    console.log(salespersons)

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
            </Grid>
        </Container>
    )
}

ViewSalesperson.propTypes = {
    baseURL: PropTypes.string.isRequired,
    callback: PropTypes.func.isRequired
}

export default ViewSalesperson