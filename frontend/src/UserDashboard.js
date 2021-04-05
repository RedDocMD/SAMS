import React, { useState } from 'react'
import {
    Box,
    Button,
    Collapse,
    Container,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography
} from '@material-ui/core'
import ViewShowsUser from './ViewShowsUser'
import ViewBookedTickets from './ViewBookedTickets'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import ListIcon from '@material-ui/icons/List'
import MovieIcon from '@material-ui/icons/Movie'

let UserDashboardEnum = Object.freeze({
    'default': 1,
    'viewShowsUser': 2,
    'viewBookedTickets': 3,
})

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}))


function UserDashboard(props) {
    const classes = useStyles()

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
        <Grid container spacing = {3}>
            <Grid item xs={12}>
                <Box mt={3}>
                    <Typography variant="h3" align="center">
                        User Dashboard
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs = {4}/>
            <Grid item xs = {4}>
                <List component="nav" aria-label="user dashboard folder">
                    <ListItem button onClick={viewShowsHandler}>
                        <ListItemIcon>
                            <ListIcon />
                        </ListItemIcon>
                        <ListItemText primary="View Shows" />
                    </ListItem>
                    <ListItem button onClick = {viewBookedTickets}>
                        <ListItemIcon>
                            <MovieIcon />
                        </ListItemIcon>
                        <ListItemText primary="View Your Tickets" />
                    </ListItem>
                </List>
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

