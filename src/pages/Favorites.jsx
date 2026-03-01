import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext.jsx";
import MovieCard from "../components/MovieCard.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { Link } from "react-router-dom";

function Favorites() {
  const { favorites } = useMovieContext();
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="favorites-empty">
        <h2>Please Log In</h2>
        <p>You need an account to save your favorite movies.</p>
        <Link to="/login" className="login-btn">Log In Here</Link>
      </div>
    );
  }
 if (favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <h2>No Favorites Yet</h2>
        <p>Start adding movies to your favorites list.</p>
      </div>
    );
  }

  
  return (
    <div className="favorites">
      <h2>Your Favorite Movies</h2>
      <div className="movies-grid">
        {favorites.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
} export default Favorites;
