import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material'
import App from './App.tsx'
import theme from './theme'
import './assets/fonts/font.css'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
)
