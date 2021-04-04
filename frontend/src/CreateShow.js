import { Container, Grid, Typography, Box, TextField, InputAdornment } from '@material-ui/core'
import React, { useState } from 'react'
import { MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import 'date-fns'

function CreateShow(props) {
    const [name, setName] = useState('')
    const [dateTime, setDateTime] = useState(new Date())
    const [duration, setDuration] = useState(60)
    
    console.log(dateTime)
    console.log(duration)

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Container>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Box mt={3}>
                            <Typography variant='h4' align='center'>
                                Create Show
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={3} />
                    <Grid item xs={6}>
                        <TextField fullWidth variant='outlined' label='Show Name' onChange={ev => setName(ev.target.value)}/>
                    </Grid>
                    <Grid item xs={3} />

                    <Grid item xs={3} />
                    <Grid item xs={6}>
                        <Box display='flex' justifyContent='space-between'>
                            <KeyboardDatePicker
                                disableToolbar
                                variant='inline'
                                format='dd/MM/yyyy'
                                label='Show Date'
                                value={dateTime}
                                onChange={date => setDateTime(date)}
                            />
                            <KeyboardTimePicker
                                variant='inline'
                                id='time-picker'
                                label='Show time'
                                value={dateTime}
                                onChange={time => setDateTime(time)}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={3} />

                    <Grid item xs={3} />
                    <Grid item xs={6} >
                        <Box display='flex' justifyContent='center'>
                            <TextField 
                                onChange={ev => setDuration(ev.target.value)}
                                defaultValue={60}
                                label='Duration'
                                type='number'
                                variant='outlined'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            min
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={3} />

                </Grid>
            </Container>
        </MuiPickersUtilsProvider>
    )
}

export default CreateShow