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
            light: '#475467',
            contrastText: '#373F41',
        },
        info: {
            main: '#1D2939',
            light: '#52575C',
            
        },
        lightgray: {
             main: '#D0D5DD'
        },
        gray: {
            main: '#667085',
        },
        warning: {
            main: '#F9FAFB',
        },
        lime: {
            main: '#9FF443',
            contrastText: '#101828'
        },
        blue: {
            main: '#253BFF',
            contrastText: 'white'
        }
    }
})