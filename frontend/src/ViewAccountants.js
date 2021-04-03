import React, {useEffect, useState} from 'react'
import {
    Button, Card, CardActions, CardContent,
    Container, Grid,
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
        let url = `${props.baseURL}/users/${id}`
        console.log(url)

        await axios.delete(url,{headers: {'Access-Control-Allow-Origin': '*'}})
            .then((response) => {
                fetchAllUsers()
            } )

    }

    let [users,setUsers] = useState([])

    useEffect(() => {
        fetchAllUsers()
    },[])

    let getElement = (user) => {
        console.log(bigIntToString(user.id))

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
                            <Button variant="contained" color="secondary" size="small" onClick={() => handleDelete((user.id))} >Delete Account </Button>
                        </CardActions >
                    </Grid>
                </Card>
            </Grid>
        )
    }

    console.log(users)
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