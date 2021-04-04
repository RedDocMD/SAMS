import { Container, Grid, Typography, Box, FormControl, TextField } from '@material-ui/core'
import { Label } from '@material-ui/icons'
import React, { useState } from 'react'

function CreateShow(props) {
    const [name, setName] = useState('')

    return (
        <Container>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Box mt={3}>
                        <Typography variant='h4' align='center'>
                            Create Show
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs />
                <Grid item xs={6}>
                    <TextField fullWidth variant='outlined' label='Show Name' onChange={ev => setName(ev.target.value)}/>
                </Grid>
                <Grid item xs />
                <Grid item xs />
                <Grid item xs={6}>
                </Grid>
                <Grid item xs />
            </Grid>
        </Container>
    )
}

export default CreateShow