import ViewShows from './ViewShows'
import { makeStyles, Box, Container, Grid, Typography, List, ListItem, ListItemText, ListItemIcon, Collapse } from '@material-ui/core'
import React, { useState } from 'react'
import MovieIcon from '@material-ui/icons/Movie'
import AddIcon from '@material-ui/icons/Add'
import ListIcon from '@material-ui/icons/List'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import ShowChartIcon from '@material-ui/icons/ShowChart'
import TrendingDownIcon from '@material-ui/icons/TrendingDown'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'

import CreateAccount from './CreateAccount'
import ViewAccountants from './ViewAccountants'
import { ExpandLess, ExpandMore } from '@material-ui/icons'

let ManagerDashboardEnum = Object.freeze({
    'default': 1,
    'createAccount': 2,
    'showAccountants': 3,
    'viewShows': 4,
})

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}))

function ManagerDashboard(props) {
    const classes = useStyles()
    const [viewState, setViewState] = useState(1)

    const createAccountHandler = () => {
        setViewState(ManagerDashboardEnum.createAccount)
    }
    const dashboardCallback = () => {
        setViewState(ManagerDashboardEnum.default)
    }
    const viewShowsHandler = () => {
        setViewState(ManagerDashboardEnum.viewShows)
    }
    const showAccountantHandler = () => {
        setViewState(ManagerDashboardEnum.showAccountants)
    }

    const [showsOpen, setShowsOpen] = useState(false)
    const [accountsOpen, setAccountsOpen] = useState(false)

    const dashboard = (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Box mt={3}>
                        <Typography variant="h3" align="center">
                            Manager Dashboard
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={4} />
                <Grid item xs={4}>
                    <List classNames={classes.root}>
                        <ListItem button onClick={() => setShowsOpen(!showsOpen)}>
                            <ListItemIcon>
                                <MovieIcon />
                            </ListItemIcon>
                            <ListItemText primary="Shows" />
                            {showsOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={showsOpen} timeout="auto" unmountOnExit>
                            <List disablePadding>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <AddIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Create Show" />
                                </ListItem>
                                <ListItem button className={classes.nested} onClick={viewShowsHandler}>
                                    <ListItemIcon>
                                        <ListIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="View Shows" />
                                </ListItem>
                            </List>
                        </Collapse>
                        <ListItem button onClick={() => setAccountsOpen(!accountsOpen)}>
                            <ListItemIcon>
                                <AccountBoxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Accounts" />
                            {accountsOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={accountsOpen} timeout="auto" unmountOnExit>
                            <List disablePadding>
                                <ListItem button className={classes.nested} onClick={createAccountHandler}>
                                    <ListItemIcon>
                                        <AddIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Create Account" />
                                </ListItem>
                            </List>
                            <List disablePadding>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <ShowChartIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Show Salesperson" />
                                </ListItem>
                            </List>
                            <List disablePadding>
                                <ListItem button className={classes.nested} onClick={showAccountantHandler}>
                                    <ListItemIcon>
                                        <TrendingDownIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Show Accountant" />
                                </ListItem>
                            </List>
                        </Collapse>
                        <ListItem button>
                            <ListItemIcon>
                                <AccountBalanceIcon />
                            </ListItemIcon>
                            <ListItemText primary="Yearly Balance Sheet"/>
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </Container>
    )

    let createAccountView = <CreateAccount callback={dashboardCallback} baseURL = {props.baseURL} />
    let showAccountantView = <ViewAccountants callback={dashboardCallback} baseURL = {props.baseURL} />
    let viewShowsView = <ViewShows callback = {dashboardCallback} baseURL = {props.baseURL}/>

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