import ReactDOM from 'react-dom'
import React from 'react'
import App from './App'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary : {
            main: 'rgba(112, 88, 209,0.75)',
        },
        secondary: {
            main: '#d93d8b',
        }
    }
})

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
    </ThemeProvider>,
    document.getElementById('root')
)