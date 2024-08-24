import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material'
import App from './App.tsx'
import theme from './theme'
import './assets/fonts/font.css'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
)
