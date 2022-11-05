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
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from 'pages/Login';
import Preferences from 'pages/Preferences';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const App = observer(() => {
  const [token] = useState(AppStore.authToken)

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    console.log('set token header - ', token);

  }, [token])

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/'>
            <Route path='/profile' element='profile' />
            <Route path='/login' element={<Login />} />
            <Route path='/registration' element={<Registration />} />
            <Route path='/preferences' element={<Preferences />} />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  )
})

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
