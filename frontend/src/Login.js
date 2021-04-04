import React, { useState } from 'react'
import { Box, Button, Container, Grid, TextField, Typography } from '@material-ui/core'
import Link from '@material-ui/core/Link'
import axios from 'axios'
import PropTypes from 'prop-types'
const JSONbig = require('json-bigint')({storeAsString})

function LoginPage(props) {
    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')
    let [userNotFoundError, setUserNotFoundError] = useState(false)

    let createAccountHandler = () => {
        props.signUpHandler()
    }

    let loginButtonAction = async () => {
        let url = `${props.baseURL}/users/login?username=${username}&password=${password}`
        const response = await axios.get(url, {transformResponse: data => data})

        let data = response.data
        if (data) {
            let json = JSONbig.parse(data)
            setUserNotFoundError(false)
            let name = json.username
            let id = (json.id.toString())
            let type = json.type
            props.loginCallback(id, type, name)
        } else {
            setUserNotFoundError(true)
        }
    }

    let usernameChanged = ev => setUsername(ev.target.value)
    let passwordChanged = ev => setPassword(ev.target.value)

    let userTextField
    if (userNotFoundError) {
        userTextField = <TextField id="username" label="Username" helperText="Username or password is incorrect"
            error fullWidth onChange={usernameChanged} variant='outlined' />
    } else {
        userTextField = <TextField id="username" label="Username" fullWidth onChange={usernameChanged} variant='outlined' />
    }

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Box mt={3}>
                        <Typography variant="h3" align="center">
                            Login
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={3} />
                <Grid item xs={6}>
                    {userTextField}
                </Grid>
                <Grid item xs={3} />
                <Grid item xs={3} />
                <Grid item xs={6}>
                    <TextField id="password" label="Password" type="Password" fullWidth onChange={passwordChanged} variant='outlined' />
                </Grid>
                <Grid item xs={3} />
                <Grid item xs={12} mt={3}>
                    <Box display = 'flex' justifyContent = 'center'>
                        <Button variant="contained" color="primary" onClick={loginButtonAction}>Login</Button>
                    </Box>
                </Grid>
                <Grid item xs={12} mt={3}>
                    <Box display = 'flex' justifyContent = 'center'>
                        <Link href="#" onClick={createAccountHandler} color="secondary">
                            Dont have an account? Signup
                        </Link>
                    </Box>

                    {/*<Button align = 'center' variant="contained" color="primary" onClick={createAccountHandler}>SignUp</Button>*/}
                </Grid>
            </Grid>
        </Container>
    )
}

LoginPage.propTypes = {
    baseURL: PropTypes.string.isRequired,
    loginCallback: PropTypes.func.isRequired,
    signUpHandler: PropTypes.func.isRequired,
}

export default LoginPage