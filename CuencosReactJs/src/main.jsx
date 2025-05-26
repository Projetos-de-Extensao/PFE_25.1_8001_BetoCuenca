import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './styles/mobile.css';
import { setupResourceErrorMonitoring } from './lib/debug-utils';

// Iniciar monitoramento de erros 404 em ambiente de desenvolvimento
if (process.env.NODE_ENV === 'development') {
  setupResourceErrorMonitoring();
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
