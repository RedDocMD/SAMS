import Login from './Login'
import {AppBar, Box, Toolbar, Typography} from '@material-ui/core'
import React, {useState} from 'react'

import ManagerDashboard from './ManagerDashboard'
import UserDashboard from './UserDashboard'
import BookTicket from './BookTicket'
import AddExpenditure from './AddExpenditure'
import CreateAccountUser from './CreateAccountUser'

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
    const [currUserType, setCurrUserType] = useState('')
    const [currState, setCurrState] = useState(StateEnum.toLogin)

    let createAccountUserHandler = () => {
        setCurrState(StateEnum.createAccountUser)
    }

    let loginCallbackHandler = () => {
        setCurrState(StateEnum.toLogin)
    }

    const loginUser = (id, type, name) => {
        setCurrId(id)
        setCurrUserType(type)
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
    const salespersonDashboardView = <BookTicket baseURL = {baseURL} callback={()=>setCurrState(1)} salespersonId = {currId} name = {currUserName}/>
    const accountantDashboardView = <AddExpenditure baseURL = {baseURL} callback={()=>setCurrState(1)} accountantId = {currId} name = {currUserName} />
    const userDashboardView = <UserDashboard baseURL = {baseURL}/>
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

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        Student Auditorium Management System (SAMS)
                    </Typography>
                </Toolbar>
            </AppBar>
            {currView}
        </Box>
    )
}

export default App