import Login from './Login'
import ManagerDashboard from './ManagerDashboard'
import {AppBar, Box, Toolbar, Typography} from '@material-ui/core'
import {useState, React}from 'react'

const StateEnum = Object.freeze({
    'toLogin': 1,
    'managerDashboard': 2,
    'salesmanDashboard': 3,
    'userDashboard': 4,
    'accountantDashboard': 5
})

const baseURL = 'http://localhost:8080'

function App(_props) {
    const [currId, setCurrId] = useState('')
    const [currUserType, setCurrUserType] = useState('')
    const [currState, setCurrState] = useState(StateEnum.toLogin)

    const loginUser = (id, type) => {
        setCurrId(id)
        setCurrUserType(type)
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

    const loginView = <Login loginCallback={loginUser} baseURL={baseURL} />
    const managerDashboardView = <ManagerDashboard baseURL={baseURL}></ManagerDashboard>

    let currView
    switch (currState) {
    case StateEnum.toLogin:
        currView = loginView
        break
    case StateEnum.managerDashboard:
        currView = managerDashboardView
        break
    case StateEnum.accountantDashboard:
        currView = <Box>Accountant</Box>
        break
    case StateEnum.salesmanDashboard:
        currView = <Box>Salesman</Box>
        break
    case StateEnum.userDashboard:
        currView = <Box>Regular</Box>
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