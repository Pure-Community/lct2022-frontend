import { Example } from 'components';
import Bubbles from 'components/Bubbles/Bubbles';
import React, { useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <main className='main'>
      <Bubbles />
    </main>
  </React.StrictMode>
);
