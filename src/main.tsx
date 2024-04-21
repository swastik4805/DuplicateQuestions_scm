import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <meta 
     http-equiv="Content-Security-Policy"   
     content="upgrade-insecure-requests" 
    />
    <App />
  </React.StrictMode>,
)
