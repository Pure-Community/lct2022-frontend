import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss'
import { observer } from "mobx-react-lite";
import { Layout } from 'components';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Registration from 'pages/Registration';
import Line from 'pages/Line';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from 'pages/Login';
import Idea from 'pages/Idea';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import IdeaCreate from 'pages/IdeaCreate';
import { AppStore } from 'stores/AppStore';
import AppStoreContext, { AppStoreContextProvider } from 'context/AppStoreContext';
import { sendRequest } from 'utils/requests';
import URLS from 'constants/urls';
import UserStore from 'stores/UserStore';
import Logout from 'pages/Logout';
import Profile from 'pages/Profile';
import Tinder from 'pages/Tinder';
import ProtectedLogin from 'components/ProtectedLogin/ProtectedLogin';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const App = observer(() => {
  const appStore = useContext(AppStoreContext)
  console.log(UserStore.user);

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
    axios.defaults.headers.common['Authorization'] = `Bearer ${appStore.authToken}`
    console.log(`Bearer ${appStore.authToken}`);
  }, [appStore.authToken])

  useEffect(() => {
    if (appStore.id) {
      sendRequest('get', URLS.profileInfo(appStore.id))
        .then(res => UserStore.setUser(res))
    }
  }, [appStore.id])

  return (
    <AppStoreContextProvider value={appStore}>
      <ThemeProvider theme={themeOptions}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path='/'>
                <Route path='' element={<Line />} />
                <Route path='profile' element={<Profile />} />
                <Route path='login' element={<Login />} />
                <Route path='logout' element={<Logout />} />
                <Route path='registration' element={<Registration />} />
                <Route path='idea' >
                  <Route path=':id' element={<Idea />} />
                  <Route path='create' element={<IdeaCreate />} />
                </Route>
                <Route path='tinder' element={<Tinder />} />
              </Route>
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </AppStoreContextProvider>
  )
})

root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
