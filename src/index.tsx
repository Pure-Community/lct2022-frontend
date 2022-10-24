import { Example } from 'components';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);



root.render(
  <React.StrictMode>
    <main className='main'>
      <Example
        title='Welcome, stranger'
        onClick={() => {
          let html = document.querySelector('html')
          if (html) html.innerHTML = ''
        }}
      />
    </main>
  </React.StrictMode>
);
