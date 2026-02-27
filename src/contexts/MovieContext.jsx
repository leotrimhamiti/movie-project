import { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

 
  useEffect(() => {
    if (user) {
      const stored = localStorage.getItem(`favorites_${user.email}`);
      setFavorites(stored ? JSON.parse(stored) : []);
    } else {
      setFavorites([]); 
    }
  }, [user]);

  
  useEffect(() => {
    if (user) {
      localStorage.setItem(
        `favorites_${user.email}`,
        JSON.stringify(favorites)
      );
    }
  }, [favorites, user]);

  const addToFavs = (movie) => {
    setFavorites(prev => {
      if (prev.some(m => m.id === movie.id)) return prev; 
      return [...prev, movie];
    });
  };

  const removeFavs = (movieId) => {
    setFavorites(prev => prev.filter(movie => movie.id !== movieId));
  };

  const isFav = (movieId) => {
    return favorites.some(movie => movie.id === movieId);
  };

  const value = {
    favorites,
    addToFavs,
    removeFavs,
    isFav,
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};