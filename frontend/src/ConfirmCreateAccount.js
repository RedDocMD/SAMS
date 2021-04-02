import React from 'react'
import {Box, Button} from '@material-ui/core'

function confirmCreateAccount(props){
    //
    // let handleConfirm = () => {
    //     props.callback()
    // }
    //
    // let handleReturn= () => {
    //     props.callback()
    // }
    
    return(
        <Box>
            Are you sure?
            <Button size="large" color="primary" variant="contained" onClick>Confirm andss Create Account</Button>
            <Button size="large" color="primary" variant="contained" onClick>Do not Create Account</Button>

        </Box>
    )
}

export default confirmCreateAccount