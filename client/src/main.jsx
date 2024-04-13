import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './contexts/AuthProvider'
import { TokenProvider } from './contexts/TokenContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TokenProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </TokenProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
