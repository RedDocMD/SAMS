import {
    Button, Container, FormControl,
    Grid,
    InputLabel, Menu,
    MenuItem, Select,
    TextField,
    Typography
} from '@material-ui/core'
import React, {useState} from 'react'
import ConfirmCreateAccount from './ConfirmCreateAccount'

const StateEnum = Object.freeze({
    'CreateAccountPage': 1,
    'ConfirmationPage': 2,
})


function createAccount(props) {

    let returnHandler = () => {
        props.callback()
    }

    let [username,setUsername] = useState('')
    let [password,setPassword] = useState('')
    let [type,setType] = useState('')
    let [currentView,setCurrentView] = useState(1)

    let changeUsername = callerEvent => setUsername(callerEvent.target.value)
    let changePassword = callerEvent => setPassword(callerEvent.target.value)
    let changeType = callerEvent => setType(callerEvent.target.value)

    let handleCreate = () => {
        setCurrentView(StateEnum.ConfirmationPage)
    }

    let CreateAccountCallBack = () => {
        setCurrentView(StateEnum.CreateAccountPage)
    }


    let CreateAccountView =  (

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
                            <MenuItem value={'Salesman'}>Salesman</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2} />

                <Grid item xs={4} />
                <Grid item xs={2}>
                    <Button size="large" variant="contained" color="primary" onClick={returnHandler}>Go back</Button>
                </Grid>
                <Grid item xs={2}>
                    <Button size="large" variant="contained" color="primary" onClick={handleCreate}>Create</Button>
                </Grid>
                <Grid item xs={4} />

                <Grid item xs={12}>
                    {/*Success/Failure Message*/}
                </Grid>
            </Grid>
        </Container>
    )

    let ConfirmAccountView = <ConfirmCreateAccount callback={CreateAccountCallBack} />

    let viewPage
    switch(currentView){
    case StateEnum.CreateAccountPage:
        viewPage = CreateAccountView
        break
    case StateEnum.ConfirmationPage:
        viewPage = ConfirmAccountView
        break
    default:
        throw Error('Invalid State in Create Account View')
    }

    return viewPage
}

export default createAccount