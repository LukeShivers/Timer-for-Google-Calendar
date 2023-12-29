import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SignOutContextProvider } from './contexts/SignOutContext.jsx'
import { LoadedContextProvider } from './contexts/LoadedContext.jsx'
import { DataContextProvider } from './contexts/DataContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <SignOutContextProvider>
    <DataContextProvider>
      <LoadedContextProvider>
        <App />
      </LoadedContextProvider>
    </DataContextProvider>
  </SignOutContextProvider>
);
