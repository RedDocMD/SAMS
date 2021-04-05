import { Container, Grid, Typography, Box, TextField, InputAdornment, Button,
    Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions } from '@material-ui/core'
import React, { useState } from 'react'
import { MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers'
import { Alert } from '@material-ui/lab'
import DateFnsUtils from '@date-io/date-fns'
import format from 'date-fns/format'
import PropTypes from 'prop-types'
import 'date-fns'
import axios from 'axios'

function CreateShow(props) {
    const AlertLevelEnum = Object.freeze({
        noAlert: 0,
        failedAlert: 1,
        errorAlert: 2,
        successAlert: 3
    })

    const [name, setName] = useState('')
    const [dateTime, setDateTime] = useState(new Date())
    const [duration, setDuration] = useState(60)
    const [regCount, setRegCount] = useState(100)
    const [regPrice, setRegPrice] = useState(250)
    const [balCount, setBalCount] = useState(50)
    const [balPrice, setBalPrice] = useState(500)
    const [isOpen, setOpen] = useState(false)
    const [alertLevel, setAlertLevel] = useState(AlertLevelEnum.noAlert)

    const createHandler = () => {
        const dateString = format(dateTime, 'yyyy-LL-dd')
        const timeString = format(dateTime, 'kk:mm:ss')
        const showData = {
            name: name,
            date: dateString,
            time: timeString,
            duration: `PT${duration}M`,
            balconyTicketCount: balCount,
            balconyTicketPrice: balPrice,
            regularTicketCount: regCount,
            regularTicketPrice: regPrice
        }
        console.log(showData)
        axios.post(`${props.baseURL}/shows`, showData)
            .then(response => {
                if (response.data !== '') {
                    setAlertLevel(AlertLevelEnum.successAlert)
                } else {
                    setAlertLevel(AlertLevelEnum.failedAlert)
                }
            })
            .catch((err) => {
                console.error(err)
                setAlertLevel(AlertLevelEnum.errorAlert)
            })
        setOpen(false)
    }

    let alert = undefined
    switch (alertLevel) {
    case AlertLevelEnum.noAlert:
        alert = ''
        break
    case AlertLevelEnum.failedAlert:
        alert = <Alert severity='error'>Failed to create show - erroneous data</Alert>
        break
    case AlertLevelEnum.errorAlert:
        alert = <Alert severity='warning'>Failed to create show - server error</Alert>
        break
    case AlertLevelEnum.successAlert:
        alert = <Alert severity='success'>Created the show `{name}`</Alert>
        break
    default:
        throw new Error('Inconsistent message state')
    }
    
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
                        <TextField required fullWidth variant='outlined' label='Show Name' onChange={ev => setName(ev.target.value)}/>
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

                    <Grid item xs={3} />
                    <Grid item xs={6}>
                        <Box display='flex' justifyContent='space-between'>
                            <TextField
                                label='Number of Regular Seats'
                                variant='outlined'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                type='number'
                                onChange={ev => setRegCount(ev.target.value)}
                                defaultValue={100}
                            />
                            <TextField
                                label='Price of Regular Ticket'
                                variant='outlined'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                type='number'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            ₹ 
                                        </InputAdornment>
                                    )
                                }}
                                onChange={ev => setRegPrice(ev.target.value)}
                                defaultValue={250}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={3} />

                    <Grid item xs={3} />
                    <Grid item xs={6}>
                        <Box display='flex' justifyContent='space-between'>
                            <TextField
                                label='Number of Balcony Seats'
                                variant='outlined'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                type='number'
                                onChange={ev => setBalCount(ev.target.value)}
                                defaultValue={50}
                            />
                            <TextField
                                label='Price of Balcony Ticket'
                                variant='outlined'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                type='number'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            ₹ 
                                        </InputAdornment>
                                    )
                                }}
                                onChange={ev => setBalPrice(ev.target.value)}
                                defaultValue={500}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={3} />
                    
                    <Grid item xs={3} />
                    <Grid item xs={6}>
                        <Box display='flex' justifyContent='space-around'>
                            <Button size='large' variant='contained' color='primary' onClick={props.callback}>Back</Button>
                            <Button size='large' variant='contained' color='secondary' onClick={() => setOpen(true)}>Create</Button>
                            <Dialog
                                open={isOpen}
                                onClose={() => setOpen(false)}
                            >
                                <DialogTitle>{'Are you sure?'}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Please confirm that you want to create this show.
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => setOpen(false)} color='default' autofocus>
                                        No, Take me Back
                                    </Button>
                                    <Button color='secondary' onClick={createHandler}>
                                        Yes, I want to create
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </Box>
                    </Grid>
                    <Grid item xs={3} />

                    <Grid item xs={3} />
                    <Grid item xs={6}>{alert}</Grid>
                    <Grid item xs={3} />

                </Grid>
            </Container>
        </MuiPickersUtilsProvider>
    )
}

CreateShow.propTypes = {
    baseURL: PropTypes.string.isRequired,
    callback: PropTypes.func.isRequired
}

export default CreateShow