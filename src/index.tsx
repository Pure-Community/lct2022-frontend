import axios from 'axios';
import { Home } from 'pages';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.scss'
import { observer } from "mobx-react-lite";
import AppStore from 'stores/AppStore';
import { Layout } from 'components';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const App = observer(() => {
  const token = useState(AppStore.authToken)

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }, [token])

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/'>
            <Route index element={<Home />} />
            <Route path='/profile' element='profile' />
            <Route path='/login' element='login' />
            <Route path='/registration' element='registration' />
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
