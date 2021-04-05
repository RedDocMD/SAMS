import Login from './Login'
import {AppBar, Box, Toolbar, Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, {useState} from 'react'

import ManagerDashboard from './ManagerDashboard'
import UserDashboard from './UserDashboard'
import BookTicket from './BookTicket'
import AddExpenditure from './AddExpenditure'
import CreateAccountUser from './CreateAccountUser'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

const StateEnum = Object.freeze({
    'toLogin': 1,
    'managerDashboard': 2,
    'salesmanDashboard': 3,
    'userDashboard': 4,
    'accountantDashboard': 5,
    'createAccountUser': 6,
})

const baseURL = 'http://localhost:8080'

function App() {
    const [currId, setCurrId] = useState('')
    const [currUserName,setCurrUserName] = useState('')
    const [currState, setCurrState] = useState(StateEnum.toLogin)

    let createAccountUserHandler = () => {
        setCurrState(StateEnum.createAccountUser)
    }

    let loginCallbackHandler = () => {
        setCurrId('')
        setCurrUserName('')
        setCurrState(StateEnum.toLogin)
    }

    const loginUser = (id, type, name) => {
        setCurrId(id)
        setCurrUserName(name)
        switch (type) {
        case 'Manager':
            setCurrState(StateEnum.managerDashboard)
            break
        case 'Customer':
            setCurrState(StateEnum.userDashboard)
            break
        case 'Salesperson':
            setCurrState(StateEnum.salesmanDashboard)
            break
        case 'Accountant':
            setCurrState(StateEnum.accountantDashboard)
            break
        default:
            throw new Error()
        }
    }

    const loginView = <Login loginCallback={loginUser} baseURL={baseURL} signUpHandler = {createAccountUserHandler}/>
    const managerDashboardView = <ManagerDashboard baseURL={baseURL}/>
    const salespersonDashboardView = <BookTicket baseURL = {baseURL} callback={loginCallbackHandler} salespersonId = {currId} name = {currUserName}/>
    const accountantDashboardView = <AddExpenditure baseURL = {baseURL} callback={loginCallbackHandler} accountantId = {currId} name = {currUserName} />
    const userDashboardView = <UserDashboard baseURL = {baseURL} customerId = {currId}/>
    const createAccountUserView = <CreateAccountUser baseURL = {baseURL}  goBackToLogin = {loginCallbackHandler}/>

    let currView
    switch (currState) {
    case StateEnum.toLogin:
        currView = loginView
        break
    case StateEnum.managerDashboard:
        currView = managerDashboardView
        break
    case StateEnum.accountantDashboard:
        currView = accountantDashboardView
        break
    case StateEnum.salesmanDashboard:
        currView = salespersonDashboardView
        break
    case StateEnum.userDashboard:
        currView = userDashboardView
        break
    case StateEnum.createAccountUser:
        currView = createAccountUserView
        break
    default:
        throw new Error()
    }

    const useStyles = makeStyles(theme => ({
        title: {
            flexGrow: 1
        }})
    )
    const classes = useStyles()

    const loginComp = (
        <Box component='span' display='flex' align='center'>
            <AccountCircleIcon />
            <Box component='span' display='flex' align='center' pl={1}>
                <Typography>
                    {currUserName ? currUserName : ''}
                </Typography>
            </Box>
        </Box>
    )

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Student Auditorium Management System (SAMS)
                    </Typography>
                    {currId ? loginComp : ''}
                </Toolbar>
            </AppBar>
            {currView}
        </Box>
    )
}

export default App