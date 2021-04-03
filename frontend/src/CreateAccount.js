import {
    Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl,
    Grid,
    InputLabel,
    MenuItem, Select,
    TextField,
    Typography,
} from '@material-ui/core'
import React, {useState} from 'react'
import axios from 'axios'
import { Alert } from '@material-ui/lab'

function createAccount(props) {

    let returnHandler = () => {
        props.callback()
    }

    let [username,setUsername] = useState('')
    let [password,setPassword] = useState('')
    let [type,setType] = useState('')
    let [open, setOpen] = useState(false)
    let [message,setMessage] = useState(0)

    let changeUsername = callerEvent => {
        setUsername(callerEvent.target.value)
        setMessage(0)
    }
    let changePassword = callerEvent => {
        setPassword(callerEvent.target.value)
        setMessage(0)
    }
    let changeType = callerEvent => {
        setType(callerEvent.target.value)
        setMessage(0)
    }

    const handleClickOpen = () => {
        setOpen(true)
    }



    const submitAndClose = () => {
        let data = {
            username : username,
            password : password,
            type : type
        }
        axios.post(`${props.baseURL}/users`,data)
            .then((response) =>{
                console.log(response)
                if(response.data !== '' )
                    setMessage(1)
                else
                    setMessage(2)
            }).catch((error)=>{
                console.log(error)
                setMessage(2)
            })

        setOpen(false)
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
                    <Typography variant="h6" align="right">Select Account Type : </Typography>
                </Grid>
                <Grid item xs={6}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="demo-simple-select-outlined-label">Account Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={type}
                            onChange={changeType}
                            label="Account Type"
                        >
                            <MenuItem value="">
                                <em>Select One</em>
                            </MenuItem>
                            <MenuItem value={'Accountant'}>Accountant</MenuItem>
                            <MenuItem value={'Salesperson'}>Salesperson</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2} />

                <Grid item xs={4} />
                <Grid item xs={2}>
                    <Button size="large" variant="contained" color="primary" onClick={returnHandler}>Go back</Button>
                </Grid>
                <Grid item xs={2}>
                    <Button size="large" variant="contained" color="primary" onClick={handleClickOpen}>Create</Button>
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

export default createAccount