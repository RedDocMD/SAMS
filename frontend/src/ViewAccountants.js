import React, {useEffect, useState} from 'react'
import {
    Button, Card, CardActions, CardContent,
    Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid,
    Typography
} from '@material-ui/core'
import axios from 'axios'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
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

    let [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    let [users,setUsers] = useState([])

    useEffect(() => {
        fetchAllUsers()
    },[])

    let getElement = (user) => {
        return (
            <Grid item xs={3} key={bigIntToString(user.id)}>

                <Card  variant="outlined" style={{backgroundColor: 'black'}}>
                    <CardContent>
                        <Grid container spacing={1} alignItems="center">
                            <Grid item xs={4}>
                                <AccountCircleIcon style={{fontSize:50, color:'white'}}/>
                            </Grid>
                            <Grid item xs ={8}>
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
                                    <Button variant="contained" onClick={() => handleDelete(user.id)} color="primary" autoFocus>
                                        Yes, I want to create
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
                    <Typography variant="h3" align="center">Accountants</Typography>
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