import React, { useState } from 'react';
import { Box, Button, Container, Grid, TextField, Typography } from "@material-ui/core";
import axios from 'axios';

function LoginPage(props) {
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [userNotFoundError, setUserNotFoundError] = useState(false);

    let loginButtonAction = () => {
        let url = `http://localhost:8080/users/login?username=${username}&password=${password}`;
        axios.get(url)
            .then((response) => {
                let data = response.data;
                if (data) {
                    setUserNotFoundError(false);
                    let id = data["id"];
                    let type = data["type"];
                    props.loginCallback(id, type);
                } else {
                    setUserNotFoundError(true);
                }
            });
    };
    let usernameChanged = ev => setUsername(ev.target.value);
    let passwordChanged = ev => setPassword(ev.target.value);

    let userTextField;
    if (userNotFoundError) {
        userTextField = <TextField id="username" label="Username" helperText="Username or password is incorrect"
            error fullWidth onChange={usernameChanged} />;
    } else {
        userTextField = <TextField id="username" label="Username" fullWidth onChange={usernameChanged} />;
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
                <Grid item xs={3} />
                <Grid item xs={6} mt={3}>
                    <Button variant="contained" color="primary" onClick={loginButtonAction}>Login</Button>
                </Grid>
                <Grid item xs={3} />
            </Grid>
        </Container>
    )
}

export default LoginPage;