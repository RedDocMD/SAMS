import { Box, Button, Typography } from '@material-ui/core'
import React from 'react'

function createAccount(props) {
    let createHandler = () => {
        props.callback()
    }
    return (
        <Box>
            <Typography variant="h3" align="center">Create Account</Typography>
            <Button variant="contained" color="primary" onClick={createHandler}>Create</Button>
        </Box>
    )
}

export default createAccount