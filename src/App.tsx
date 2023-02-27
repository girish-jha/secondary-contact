import './App.css';
import { BrowserRouter, Routes, Route, useNavigate, HashRouter } from 'react-router-dom';
import { Home } from './pages/Home';
import { Edit } from './pages/Edit';
import { Details } from './pages/Details';
import { useLiveQuery } from "dexie-react-hooks";
import { contacts } from './db';
// import { Index } from './pages/Index';
import { BottomNavigation, BottomNavigationAction, Box, Container, SpeedDial, SpeedDialIcon } from '@mui/material';
import { Restore, Favorite, LocationOn, ContactPhoneSharp, Add } from '@mui/icons-material'
import { useState } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });

function App() {
  const [searchKey, setSearchKey] = useState<string>('');

  const searchChanged = (val: string) => {
    setSearchKey(val);
  }


  return (
    <div className="App">
      <ThemeProvider theme={lightTheme}>
        <Header searchKey={searchKey} setSearchKey={setSearchKey} />
        <Container maxWidth="sm" sx={{ paddingTop: "2rem" }} >
          <Box
            sx={{
              mb: 2,
              display: "flex",
              flexDirection: "column",
              height: 700,
              overflow: "hidden",
              overflowY: "scroll",
            }}
          >
            <HashRouter>
              <Routes>
                <Route element={<Home searchKey={searchKey} />} path="/" />
                <Route element={<Home searchKey={searchKey} />} path="/:showFavorite" />
                <Route element={<Edit />} path="/edit/:id?" />
                <Route element={<Details />} path="/details/:id?" />
              </Routes>
              <Footer />
            </HashRouter>
          </Box>

        </Container>
      </ThemeProvider>

    </div >
  );
}


export default App;
