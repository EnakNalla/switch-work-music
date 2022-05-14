import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/App';
import './global.scss';
import ProvideStore from './stores/ProvideStore';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProvideStore>
      <App />
    </ProvideStore>
  </React.StrictMode>
);
