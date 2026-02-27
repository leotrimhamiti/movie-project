import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./css/index.css";
import './css/App.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

import { AuthProvider } from './contexts/AuthContext.jsx';
import { MovieProvider } from './contexts/MovieContext.jsx';

createRoot(document.getElementById('root')).render(
   <StrictMode>
    <AuthProvider>
    <BrowserRouter>
    <MovieProvider>
      <App />
      </MovieProvider>
    </BrowserRouter>
    </AuthProvider>
  </StrictMode>
)
