import { createTheme } from "@mui/material"
import './theme-module'

export default createTheme({
    typography: {
        button: {
          textTransform: 'none'
        }
      },
    palette: {
        primary: {
            main: '#101828'
        },
        white: {
            main: 'white',
            contrastText: 'white'
        },
        secondary: {
            main: '#A4A6B3',
            contrastText: '#373F41'
        },
        info: {
            main: '#1D2939',
            light: '#52575C'
        },
        gray: {
            main: '#667085'
        },
        warning: {
            main: '#737B7D'
        },
        lime: {
            main: '#9FF443',
            contrastText: '#101828'
        }
    }
})