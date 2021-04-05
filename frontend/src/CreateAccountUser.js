import React, {useState} from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import {Alert} from '@material-ui/lab'
import {
    Button,
    Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Grid,
    TextField,
    Typography,
    Box
} from '@material-ui/core'

function CreateAccountUser(props) {
    let [username,setUsername] = useState('')
    let [password,setPassword] = useState('')
    let [open, setOpen] = useState(false)
    let [message,setMessage] = useState(0)
    let [confirmPassword, setConfirmPassword] = useState('')

    let returnHandler = () => {
        props.goBackToLogin()
    }

    let changeUsername = callerEvent => {
        setUsername(callerEvent.target.value)
        setMessage(0)
    }
    let changePassword = callerEvent => {
        setPassword(callerEvent.target.value)
        setMessage(0)
    }
    let changeConfirmPassword = callerEvent => {
        setConfirmPassword(callerEvent.target.value)
        setMessage(0)
    }
    const handleClickOpen = () => {
        setOpen(true)
    }
    const submitAndClose = () => {
        let data = {
            username : username,
            password : password,
            type : 'Customer',
        }
        if(password != confirmPassword){
            setOpen(false)
            setMessage(3)
        }
        else {
            axios.post(`${props.baseURL}/users`, data)
                .then((response) => {
                    console.log(response)
                    if (response.data !== '')
                        setMessage(1)
                    else
                        setMessage(2)
                }).catch((error) => {
                    console.log(error)
                    setMessage(2)
                })
            setOpen(false)
        }
    }

    const handleClose = () => {
        setOpen(false)
    }

    let alertMessage
    switch (message){
    case 0:
        alertMessage = ''
        break
    case 1:
        alertMessage = <Alert variant="filled" severity="success">
            Successfully created Account
        </Alert>
        break
    case 2:
        alertMessage = <Alert variant="filled" severity="error">
            Invalid Data or Username already exists.
        </Alert>
        break
    case 3:
        alertMessage = <Alert variant="filled" severity="error">
            Passwords dont match
        </Alert>
        break
    default:
        throw Error('Invalid state in Create Account')
    }

    return(
        <Container>
            <Grid container spacing={6} alignItems="center">
                <Grid item xs={12}>
                    <Typography variant="h3" align="center">Create Account</Typography>
                </Grid>

                <Grid item xs={4}>
                    <Typography variant="h6" align="right">Enter New Username : </Typography>
                </Grid>

                <Grid item xs={6} >
                    <TextField fullWidth id="outlined-basic" label="Username" variant="outlined" onChange={changeUsername}/>
                </Grid>
                <Grid item xs={2} />

                <Grid item xs={4}>
                    <Typography variant="h6" align="right">Enter New Password : </Typography>
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth id="outlined-basic" label="Password" variant="outlined" onChange={changePassword}/>
                </Grid>
                <Grid item xs={2} />

                <Grid item xs={4}>
                    <Typography variant="h6" align="right">Retype Password : </Typography>
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth id="outlined-basic" label="Confirm Password" variant="outlined" onChange={changeConfirmPassword }/>
                </Grid>
                <Grid item xs={2} />

                <Grid item xs={4} />
                <Grid item xs={2}>
                    <Box display = 'flex' justifyContent='center'>
                        <Button size="large" variant="contained" color="primary" onClick={returnHandler}>Go back</Button>
                    </Box>
                </Grid>
                <Grid item xs={2}>
                    <Box display = 'flex' justifyContent='center'>
                        <Button size="large" variant="contained" color="primary" onClick={handleClickOpen}>Create</Button>
                    </Box>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{'Are you sure?'}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Please confirm that you want to create this account.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" onClick={handleClose} color="primary">
                                No, Take me Back
                            </Button>
                            <Button variant="contained" onClick={submitAndClose} color="primary" autoFocus>
                                Yes, I want to create
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
                <Grid item xs={4} />

                <Grid item xs={4} />
                <Grid item xs={4} >
                    {alertMessage}
                </Grid>
                <Grid item xs={4} />

            </Grid>
        </Container>
    )
}

CreateAccountUser.propTypes = {
    baseURL: PropTypes.string.isRequired,
    goBackToLogin: PropTypes.func.isRequired,
}

export default CreateAccountUser