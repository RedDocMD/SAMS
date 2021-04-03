import React, { useState } from 'react'
import { Box, Button, Container, Grid, TextField, Typography } from '@material-ui/core'
import axios from 'axios'
import PropTypes from 'prop-types'
import JSONbig from 'json-bigint'

const bigIntToString = num => {
    const parts = num.c
    let res = ''
    for (const part of parts) {
        res = res.concat(part.toString())
    }
    return res
}



function LoginPage(props) {
    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')
    let [userNotFoundError, setUserNotFoundError] = useState(false)

    let loginButtonAction = async () => {
        let url = `${props.baseURL}/users/login?username=${username}&password=${password}`
        const response = await axios.get(url, {transformResponse: data => data})

        let data = response.data
        if (data) {
            let json = JSONbig.parse(data)
            setUserNotFoundError(false)
            let name = json.username
            let id = bigIntToString(json.id)
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
            error fullWidth onChange={usernameChanged} />
    } else {
        userTextField = <TextField id="username" label="Username" fullWidth onChange={usernameChanged} />
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
                    <TextField id="password" label="Password" type="Password" fullWidth onChange={passwordChanged} />
                </Grid>
                <Grid item xs={3} />
                <Grid item xs={5} />
                <Grid item xs={2} mt={3}>
                    <Box display='flex' justifyContent='center'>
                        <Button variant="contained" color="primary" onClick={loginButtonAction}>Login</Button>
                    </Box>
                </Grid>
                <Grid item xs={5} />
            </Grid>
        </Container>
    )
}

LoginPage.propTypes = {
    baseURL: PropTypes.string.isRequired,
    loginCallback: PropTypes.func.isRequired
}

export default LoginPage