
import { Box, styled } from '@mui/material'
import AppDrawer, { drawerWidth } from './components/layouts/AppDrawer'
import './App.css'
import { BrowserRouter } from 'react-router-dom'

const Main = styled(Box, { shouldForwardProp: prop => prop !== 'open' })(
  () => ({
    display: 'flex',
    flexDirection: 'column',
    marginLeft: `calc(${drawerWidth})`,
  })
);

function App() {
  return (
    <Main>
      <BrowserRouter>
        <AppDrawer/>
      </BrowserRouter>
    </Main>
  )
}

export default App
