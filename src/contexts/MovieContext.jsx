import { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext.jsx";

const MovieContext = createContext();
export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  


  const getUserKey = () => {
    if (!user) return null;
    return user.email || user.username || user.id;
  };

  // 1. Load favorites
  useEffect(() => {
    const key = getUserKey();
    if (key) {
      const stored = localStorage.getItem(`favorites_${key}`);
      setFavorites(stored ? JSON.parse(stored) : []);
      setIsLoaded(true);
    } else {
      setFavorites([]);
      setIsLoaded(false);
    }
  }, [user]);

  
  useEffect(() => {
    const key = getUserKey();
    if (key && isLoaded) {
      localStorage.setItem(`favorites_${key}`, JSON.stringify(favorites));
    }
  }, [favorites, user, isLoaded]);

  const addToFavs = (movie) => {
    setFavorites(prev => {
      if (prev.some(m => m.id === movie.id)) return prev;
      return [...prev, movie];
    });
  };

  const removeFromFavs = (movieId) => {
    setFavorites(prev => prev.filter(m => m.id !== movieId));
  };

  const isFavorite = (movieId) => {
    return favorites.some((m) => m.id === movieId);
  };

  const contextValue = {
    favorites,
    addToFavs,
    removeFromFavs,
    isFavorite
  };

  

  return (
    <MovieContext.Provider value={contextValue}>
      {children}
    </MovieContext.Provider>
  );
}; export default MovieContext;