import ViewShows from './ViewShows'
import { Box, Button, Container, Grid, Typography } from '@material-ui/core'
import React, { useState } from 'react'

import CreateAccount from './CreateAccount'
import ViewAccountants from './ViewAccountants'

let ManagerDashboardEnum = Object.freeze({
    'default': 1,
    'createAccount': 2,
    'showAccountants': 3,
    'viewShows': 4,
})

function ManagerDashboard(props) {
    let [viewState, setViewState] = useState(1)
    let createAccountHandler = () => {
        setViewState(ManagerDashboardEnum.createAccount)
    }
    let dashboardCallback = () => {
        setViewState(ManagerDashboardEnum.default)
    }
    let viewShowsHandler = () => {
        setViewState(ManagerDashboardEnum.viewShows)
    }
    let showAccountantHandle = () => {
        setViewState(ManagerDashboardEnum.showAccountants)
    }


    let dashboard = (<Container>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Box>
                    <Typography variant="h3" align="center">
                        Manager Dashboard
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={3}>
                <Button variant="contained" color="primary" onClick={createAccountHandler}>
                    Create Account
                </Button>
            </Grid>
            <Grid item xs={3}>
                <Button variant="contained" color="primary" onClick={showAccountantHandle}>
                    Show Accountant
                </Button>
                <Button variant="contained" color="primary" onClick={viewShowsHandler}>
                    View Shows
                </Button>
            </Grid>
        </Grid>
    </Container>)
    let createAccountView = <CreateAccount callback={dashboardCallback} baseURL = {props.baseURL} />
    let showAccountantView = <ViewAccountants callback={dashboardCallback} baseURL = {props.baseURL} />
    let viewShowsView = <ViewShows callback = {dashboardCallback} baseURL = {_props.baseURL}/>

    let currView
    switch (viewState) {
    case ManagerDashboardEnum.default:
        currView = dashboard
        break
    case ManagerDashboardEnum.createAccount:
        currView = createAccountView
        break
    case ManagerDashboardEnum.showAccountants:
        currView = showAccountantView
        break
    case ManagerDashboardEnum.viewShows:
        currView = viewShowsView
        break
    default:
        throw Error('Invalid state in Manager Dashboard')
    }

    return currView
}

export default ManagerDashboard