import React, {useEffect, useState} from 'react'
import {
    Button, Card, CardActions, CardContent,
    Container, Grid,
    Typography
} from '@material-ui/core'
import axios from 'axios'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

function viewAccountants(props){

    let returnHandler = () => {
        props.callback()
    }

    const fetchAllUsers = async () => {
        try{
            let url =  `${props.baseURL}/users`
            setUsers([])
            const response = await axios.get(url, {transformResponse : axios.defaults.transformResponse})
            setUsers(response.data)
        }catch (e){
            setUsers([])
        }
    }

    let handleDelete = async (id) => {
        let url = `${props.baseURL}/users/${BigInt(id)}`
        console.log(BigInt(id))
        console.log(url)

        await axios.delete(url)
            .then((response) => {
                console.log(response.data)
            } )

    }

    let [users,setUsers] = useState([])

    useEffect(() => {
        fetchAllUsers()
    },[])

    let getElement = (user) => {
        console.log(user.name)

        return (
            <Grid item xs={4} key={user.id}>

                <Card  variant="outlined">
                    <CardContent>
                        <Grid container spacing={1} alignItems="center">
                            <Grid item xs={2}>
                                <AccountCircleIcon style={{fontSize:50, color:'blue'}}/>
                            </Grid>
                            <Grid item xs ={10}>
                                <Typography style={{fontSize:17}}>
                                Username: {user.username}
                                </Typography>
                            </Grid>
                        </Grid>

                    </CardContent>
                    <CardActions>
                        {console.log(BigInt(user.id))}
                        <Button variant="contained" color="secondary" size="small" onClick={() => handleDelete((user.id))} >Delete Account </Button>

                    </CardActions>

                </Card>
            </Grid>
        )
    }

    console.log(users[0])

    let listView = users.filter( (user) => {
        return user.type.toString() === 'Accountant'
    }).map( (user) => getElement(user))

    // console.log(users.length)
    // for(let i=0;i<users.length;i++){
    //     if(users[i].type === 'Accountant') {
    //         listView.push(getElement(users[i]))
    //     }
    // }


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