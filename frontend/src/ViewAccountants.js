import React, {useEffect, useState} from 'react'
import {
    Avatar,
    Button, Card, CardActions, CardContent,
    Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid,
    Typography, Box
} from '@material-ui/core'
import axios from 'axios'
import JSONbig from 'json-bigint'

const bigIntToString = num => {
    const parts = num.c
    let res = ''
    for (const part of parts) {
        res = res.concat(part.toString())
    }
    return res
}

function viewAccountants(props){

    let returnHandler = () => {
        props.callback()
    }

    let [users,setUsers] = useState([])
    let [open, setOpen] = useState(false)


    const fetchAllUsers = async () => {
        try{
            let url =  `${props.baseURL}/users`
            setUsers([])
            const response = await axios.get(url, {transformResponse : data => data })
            const json = JSONbig.parse(response.data)
            setUsers(json)
        }catch (e){
            setUsers([])
        }
    }

    let handleDelete = async (id) => {
        let url = `${props.baseURL}/users/`
        url  = url.concat(bigIntToString(id))

        await axios.delete(url)
            .then((response) => {
                fetchAllUsers()
            } )
        setOpen(false)
    }


    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }


    useEffect(() => {
        fetchAllUsers()
    },[])

    let getElement = (user) => {
        return (
            <Grid item xs={3} key={bigIntToString(user.id)}>

                <Card  variant="outlined" style={{backgroundColor: 'black'}}>
                    <CardContent>
                        <Grid container spacing={1} alignItems="center">
                            <Grid item xs={3}>
                                <Avatar style={{backgroundColor:'blue'}}>{user.username[0].toUpperCase()}</Avatar>
                            </Grid>
                            <Grid item xs ={9}>
                                <Typography style={{fontSize:17,color:'white'}}>
                                    Username: {user.username}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Grid item xs={12}>
                        <CardActions >
                            <Button variant="contained" color="secondary" size="small" onClick={handleClickOpen} >Delete Account </Button>
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">{'Are you sure?'}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Please confirm that you want to delete this account.
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button variant="contained" onClick={handleClose} color="primary">
                                        No, Take me Back
                                    </Button>
                                    <Button variant="contained" onClick={() => handleDelete(user.id)} color="secondary" autoFocus>
                                        Yes, I want to delete
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </CardActions >
                    </Grid>
                </Card>
            </Grid>
        )
    }

    let listView = users.filter( (user) => {
        return user.type.toString() === 'Accountant'
    }).map( (user) => getElement(user))


    return(
        <Container>
            <Grid container spacing={6} alignItems="center">
                <Grid item xs={12}>
                    <Box mt={3}>
                        <Typography variant="h3" align="center">Accountants</Typography>
                    </Box>
                </Grid>
                { listView }
                <Grid item xs={12} />
                <Grid item xs={5} />

                <Grid item xs={4} alignItems="center">
                    <Button size="large" variant="contained" color="primary" onClick={returnHandler}>Go back</Button>
                </Grid>
                <Grid item xs={3} />


            </Grid>
        </Container>
    )


}

export default viewAccountants