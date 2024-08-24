
import { Box, styled } from '@mui/material'
import AppDrawer, { drawerWidth } from './components/layouts/AppDrawer'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('@/pages/Home'))

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
        <Suspense fallback={<div>Loading...</div>} >
            <Routes>
                <Route path="/" element={<Home/>} />
            </Routes>
            </Suspense>
      </BrowserRouter>
    </Main>
  )
}

export default App
