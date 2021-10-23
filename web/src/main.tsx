import React from 'react';
import ReactDOM from 'react-dom';

import { AuthProvider } from './contexts/auth';

import { App } from './App';

import './styles/global.scss';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
