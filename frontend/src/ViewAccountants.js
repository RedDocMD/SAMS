import React, {useEffect, useState} from 'react'
import {
    Avatar,
    Button, Card, CardActions, CardContent,
    Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid,
    Typography, Box, Paper
} from '@material-ui/core'
import axios from 'axios'
const JSONbig = require('json-bigint')({ storeAsString: true })

function viewAccountants(props){

    let returnHandler = () => {
        props.callback()
    }

    let [users,setUsers] = useState([])
    let [userId,setUserId] = useState('')
    let [open, setOpen] = useState(false)

    const fetchAllUsers = async () => {
        try{
            let url =  `${props.baseURL}/users`
            setUsers([])
            const response = await axios.get(url, {transformResponse : data => data })
            // console.log(response.data)
            const json = JSONbig.parse(response.data)
            setUsers(json)
        }catch (e){
            setUsers([])
        }
    }

    let handleDelete = async () => {
        let url = `${props.baseURL}/users/`
        url  = url.concat( userId )
        // console.log(url)
        try {
            const resp = await axios.delete(url)
            console.log(resp)
            setUsers(users.filter(user =>{
                return user.id !== userId
            }))
        }catch (e){
            console.log(e)
        }

        setOpen(false)
    }

    const handleClickOpen = (id) => {
        setOpen(true)
        setUserId(id)
    }

    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        fetchAllUsers()
    },[])

    let getElement = (user) => {
        let id = user.id
        // console.log(user)
        return (
            <Grid item xs={3} key={id}>

                <Card component={Paper} variant="outlined" >
                    <CardContent>
                        <Grid container spacing={1} alignItems="center">
                            <Grid item xs={3}>
                                <Avatar style={{color:'white'}}>{user.username[0].toUpperCase()}</Avatar>
                            </Grid>
                            <Grid item xs ={9}>
                                <Typography style={{fontSize:17,color:'white'}}>
                                    {user.username}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>

                    <CardActions >

                        <Button  variant="contained" color="secondary" size="small" onClick={() => handleClickOpen(id)} >Delete Account </Button>
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
                            <DialogActions >
                                <Button variant="contained" onClick={handleClose} color="primary">
                                        No, Take me Back
                                </Button>
                                <Button variant="contained" onClick={handleDelete} color="secondary">
                                        Yes, I want to delete
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </CardActions >
                </Card>
            </Grid>
        )
    }

    let listView = users.filter( (user) => {
        return user.type.toString() === 'Accountant'
    }).map( (user) => getElement(user))

    // console.log(users)

    return(
        <Container>
            <Grid container spacing={6} >
                <Grid item xs={12}>
                    <Box mt={3}>
                        <Typography variant="h4" align="center">Accountants</Typography>
                    </Box>
                </Grid>
                { listView }
                <Grid item xs={12} />
                <Grid item xs={5} />

                <Grid item xs={4}>
                    <Button size="large" variant="contained" color="primary" onClick={returnHandler}>Go back</Button>
                </Grid>
                <Grid item xs={3} />

            </Grid>
        </Container>
    )
}

export default viewAccountants