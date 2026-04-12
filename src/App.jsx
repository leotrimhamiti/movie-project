import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './css/App.css';
import MovieCard from './components/MovieCard.jsx'
import Home from './pages/Home.jsx'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Favorites from './pages/Favorites.jsx'
import Navbar from './components/Navbar.jsx'
import { MovieProvider } from './contexts/MovieContext.jsx';
import NotFound from './pages/NotFound.jsx';
import SignUp from './pages/SignUp.jsx';
import Login from './pages/Login.jsx';
import Footer from './components/Footer.jsx';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';
import { Navigate } from 'react-router-dom';

function App() {
  const { user } = useAuth();

  return (
    <MovieProvider>
      <div className="app">
        <Navbar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/favourites" element={<Favorites />} />
            <Route 
              path="/login" 
              element={user ? <Navigate to="/" /> : <Login />} 
            />
            <Route 
              path="/signup" 
              element={user ? <Navigate to="/" /> : <SignUp />} 
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </MovieProvider>
  );
}

export default App
