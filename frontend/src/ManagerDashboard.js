import CreateAccount from './CreateAccount'
import { Box, Button, Container, Grid, Typography } from '@material-ui/core'
import React, { useState } from 'react'

let ManagerDashboardEnum = Object.freeze({
    'default': 1,
    'createAccount': 2,
})

function ManagerDashboard(props) {
    let [viewState, setViewState] = useState(1)
    let createAccountHandler = () => {
        setViewState(ManagerDashboardEnum.createAccount)
    }
    let createAccountCallback = () => {
        setViewState(ManagerDashboardEnum.default)
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
        </Grid>
    </Container>)
    let createAccountView = <CreateAccount callback={createAccountCallback}></CreateAccount>

    let currView
    switch (viewState) {
    case ManagerDashboardEnum.default:
        currView = dashboard
        break
    case ManagerDashboardEnum.createAccount:
        currView = createAccountView
        break
    default:
        throw Error('Invalid state in Manager Dashboard')
    }

    return currView
}

export default ManagerDashboard