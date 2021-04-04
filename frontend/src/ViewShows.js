import { Box, Button, Typography, Container, Grid } from '@material-ui/core'
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ViewShowStats from './viewShowStats'
const JSONbig = require('json-bigint')({storeAsString: true})

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        // margin: theme.spacing(2),
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightBold,
    },
    content: {
        backgroundColor: '#3F51B4' ,
        color: '#FFF'
    },
}))

let ViewShowsEnum = Object.freeze({
    'default': 1,
    'viewShowStats': 2,
})

function ViewShows(props) {
    const classes = useStyles()

    let [viewState, setViewState] = useState(1)
    let [shows, setShows] = useState([])
    let [show, setShow] = useState('')

    let goBackHandler = () => {
        props.callback()
    }
    let viewStateCallback = () => {
        setViewState(ViewShowsEnum.default)
    }
    let viewShowStatsHandler = (show) => {
        setViewState(ViewShowsEnum.viewShowStats)
        setShow(show)
    }

    let getElement = (show, i) => {
        return (
            <Grid item xs = {12}  key = {show.id}>
                <Box className = {classes.root}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading}>Show at {show.time} on {show.date}</Typography>
                        </AccordionSummary>
                        <AccordionDetails className = {classes.content}>
                            <Grid container spacing={3}>
                                <Grid item xs={1} />
                                <Grid item xs={6} >
                                    <Typography>
                                        Duration: {show.duration}
                                    </Typography>
                                </Grid>
                                <Grid item xs={5} />
                                <Grid item xs={1} />
                                <Grid item xs={6} >
                                    <Typography>
                                        Balcony Ticket Count: {show.balconyTicketCount}
                                    </Typography>
                                </Grid>
                                <Grid item xs={5} />
                                <Grid item xs={1} />
                                <Grid item xs={6} >
                                    <Typography>
                                        Regular Ticket Count: {show.regularTicketCount}
                                    </Typography>
                                </Grid>
                                <Grid item xs={5} />
                                <Grid item xs={5} />
                                <Grid item xs = {2}>
                                    <Button variant="contained" color="secondary" onClick={() => viewShowStatsHandler(show)}>View Show Stats</Button>
                                </Grid>
                                <Grid item xs={5} />
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            </Grid>
        )
    }

    useEffect(() => {
        const fetchShows = async () => {
            try{
                let url =  `${props.baseURL}/shows`
                setShows([])
                const response = await axios.get(url,{transformResponse: data => data})
                const json = JSONbig.parse(response.data)
                setShows(json)
            }catch (e){
                setShows([])
            }
        }
        fetchShows()
    },[])

    let listOfShows = shows.map((show, i) => getElement(show, i))

    let dashboard = (
        <div>
            <Container>
                <Grid container>
                    <Grid item xs={12}>
                        <Box mt={3} mb = {3}>
                            <Typography variant="h4" align="center">
                                List of Shows
                            </Typography>
                        </Box>
                    </Grid>
                    {listOfShows}
                    <Grid item xs={5} />
                    <Grid item xs={2} mt={3}>
                        <Box mt={3} display='flex' justifyContent='center'>
                            <Button variant="contained" color="primary" onClick={goBackHandler}>Go Back</Button>
                        </Box>
                    </Grid>
                    <Grid item xs={5} mt = {3}/>
                </Grid>
            </Container>
        </div>
    )
    let viewShowStatsView = <ViewShowStats callback = {viewStateCallback} show = {show} baseURL = {props.baseURL} />

    let currView
    switch (viewState) {
    case ViewShowsEnum.default:
        currView = dashboard
        break
    case ViewShowsEnum.viewShowStats:
        currView = viewShowStatsView
        break
    default:
        throw Error('Invalid state in View Shows')
    }


    return currView
}

ViewShows.propTypes = {
    baseURL: PropTypes.string.isRequired,
    callback: PropTypes.func.isRequired
}

export default ViewShows