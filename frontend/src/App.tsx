
import { Box, Grid, IconButton, styled, useMediaQuery, useTheme } from '@mui/material'
import AppDrawer, { drawerWidth } from './components/layouts/AppDrawer'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { lazy, Suspense, useState } from 'react';
import { OPEN_MENU_BLACK } from './assets/logo';

const Home = lazy(() => import('@/pages/Home'))

const Main = styled(Box, { shouldForwardProp: prop => prop !== 'open' })(
  ({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      marginLeft:  `calc(${drawerWidth})`,
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: 0
    }

  })
);

function App() {
  const theme = useTheme();
  const matchesUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const [openDrawer, setOpenDrawer] = useState(false)
  return (
    <Main>
      <BrowserRouter>
        <AppDrawer onClose={() => setOpenDrawer(false)} open={openDrawer} />
        <Suspense fallback={<div>Loading...</div>} >
            {!matchesUpMd && (
              <Grid container>
                <IconButton onClick={() => setOpenDrawer(true)}>
                    <img src={OPEN_MENU_BLACK} alt="Open Menu" />
                </IconButton>
              </Grid>
            )}
          
            <Routes>
                <Route path="/" element={<Home/>} />
            </Routes>
            </Suspense>
      </BrowserRouter>
    </Main>
  )
}

export default App
