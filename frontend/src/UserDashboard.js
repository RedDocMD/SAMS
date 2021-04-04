import React, { useState } from 'react'
import { Box, Button, Container, Grid, Typography } from '@material-ui/core'
import ViewShowsUser from './ViewShowsUser'
import ViewBookedTickets from './ViewBookedTickets'
import PropTypes from 'prop-types'

let UserDashboardEnum = Object.freeze({
    'default': 1,
    'viewShowsUser': 2,
    'viewBookedTickets': 3,
})


function UserDashboard(props) {
    let [viewState, setViewState] = useState(1)
    let dashboardCallback = () => {
        setViewState(UserDashboardEnum.default)
    }
    let viewShowsHandler = () => {
        setViewState(UserDashboardEnum.viewShowsUser)
    }
    let viewBookedTickets = () => {
        setViewState(UserDashboardEnum.viewBookedTickets)
    }

    let dashboard = (<Container>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Box>
                    <Typography variant="h3" align="center">
                        User Dashboard
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={3}>
                <Button variant="contained" color="primary" onClick={viewShowsHandler}>
                    View Shows
                </Button>
            </Grid>
            <Grid item xs={3}>
                <Button variant="contained" color="primary" onClick={viewBookedTickets}>
                    View Your Tickets
                </Button>
            </Grid>
        </Grid>
    </Container>)

    let viewShowsUserView = <ViewShowsUser baseURL = {props.baseURL} callback = {dashboardCallback}/>
    let viewBookedTicketsView = <ViewBookedTickets baseURL = {props.baseURL} callback = {dashboardCallback} customerId = {props.customerId}/>
    let currView
    switch (viewState) {
    case UserDashboardEnum.default:
        currView = dashboard
        break
    case UserDashboardEnum.viewShowsUser:
        currView = viewShowsUserView
        break
    case UserDashboardEnum.viewBookedTickets:
        currView = viewBookedTicketsView
        break
    default:
        throw Error('Invalid State in User Dashboard')
    }


    return currView
}

UserDashboard.propTypes = {
    baseURL: PropTypes.string.isRequired,
    customerId: PropTypes.string.isRequired,
}


export default UserDashboard