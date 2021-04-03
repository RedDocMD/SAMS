import React, {useEffect, useState} from 'react'
import {
    Button, Card, CardActions, CardContent,
    Container, Grid,
    Typography
} from '@material-ui/core'
import axios from 'axios'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import * as JSONbigNative from '@babel/core'
import * as JSONbig from '@babel/core'

function viewAccountants(props){

    let returnHandler = () => {
        props.callback()
    }

    const fetchAllUsers = async () => {
        try{
            let url =  `${props.baseURL}/users`
            setUsers([])
            const response = await axios.get(url, {transformResponse :  axios.defaults.transformResponse})

            // (data)=> 
            // {
            //     // Do whatever you want to transform the data
            //     data = JSONbig.parse(data)
            //     console.log(data)
            //
            //     // for(let i=0;i<data.length;i++) {
            //     //     data[i].id = JSONbigNative.parse(data[i].id)
            //     //     console.log(data[i])
            //     // }
            //     return data
            console.log(response.data)

            setUsers(response.data)
        }catch (e){
            setUsers([])
        }
    }

    let handleDelete = async (id) => {
        let url = `${props.baseURL}/users/${id}`
        console.log(BigInt(id))
        console.log(url)

        await axios.delete(url,{headers: {'Access-Control-Allow-Origin': '*'}})
            .then((response) => {
                console.log(response.data)
            } )

    }

    let [users,setUsers] = useState([])

    useEffect(() => {
        fetchAllUsers()
    },[])

    let getElement = (user) => {
        console.log(JSONbig.parse(user.id.toString()))

        return (
            <Grid item xs={3} key={user.id}>

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
                            {console.log(BigInt(user.id))}
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