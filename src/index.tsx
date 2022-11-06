import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss'
import { observer } from "mobx-react-lite";
import AppStore from 'stores/AppStore';
import { Layout } from 'components';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Registration from 'pages/Registration';
import Line from 'pages/Line';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from 'pages/Login';
import Preferences from 'pages/Preferences';
import Idea from 'pages/Idea';
import { ThemeProvider, createTheme } from '@mui/material/styles';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const App = observer(() => {
  const [token] = useState(AppStore.authToken)

  const themeOptions = createTheme({
    palette: {
      primary: {
        main: '#6750A4',
      },
      secondary: {
        main: '#722555',
      },
      background: {
        default: '#fffbfe',
      },
      text: {
        primary: '#182B4D',
        secondary: '#243D66',
      },
      error: {
        main: '#B3261E',
      },
    },
  })


  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    console.log('set token header - ', token);

  }, [token])

  return (
    <ThemeProvider theme={themeOptions}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/'>
              <Route path='' element={<Line />} />
              <Route path='/profile' element='profile' />
              <Route path='/login' element={<Login />} />
              <Route path='/registration' element={<Registration />} />
              <Route path='/preferences' element={<Preferences />} />
              <Route path='/idea/:id' element={<Idea />} />
            </Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  )
})

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
