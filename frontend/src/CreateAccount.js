import { useState } from 'react';
import { Box, Button, Container, Grid, TextField, Typography } from "@material-ui/core";

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

export default createAccount;