import { Box, Button, Typography, Container } from '@material-ui/core'
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}))

function ViewShows(props) {
    const classes = useStyles()

    let createHandler = () => {
        props.callback()
    }

    let getElement = (show) => {
        return (
            <div className = {classes.root}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>Accordion 1</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        )
    }

    let [shows, setShows] = useState('')


    let renderShows = () => {
        let url = `${props.baseURL}/shows`
        axios.get(url)
            .then((response) =>{
                console.log(shows)
                setShows(response.data)
            })
        return (
            <ul>
                <li>Hello</li>
            </ul>
        )
    }
    let view = renderShows()
    console.log(shows)

    return (
        'Aaditya'
        // <Box>
        //     <Typography variant="h3" align="center">Create Account</Typography>
        //     <Button variant="contained" color="primary" onClick={createHandler}>Go Back</Button>
        // </Box>
    )
}

ViewShows.propTypes = {
    baseURL: PropTypes.string.isRequired,
    callback: PropTypes.func.isRequired
}

export default ViewShows