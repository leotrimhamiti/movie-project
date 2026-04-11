import '../css/MovieCard.css'
import { useMovieContext } from '../contexts/MovieContext';
import { useAuth } from '../contexts/AuthContext';

function MovieCard({ movie }) {
    
    const { isFavorite, addToFavs, removeFromFavs } = useMovieContext();
    
    const {user} = useAuth();
    

    const favorite = isFavorite(movie.id);

    function onFavoriteClick(e) {
        e.preventDefault();

        

        if(!user) {
            alert("You need to log in to add favorite movies")
            return;
        }

        if (favorite) {
            removeFromFavs(movie.id);
        } else {
            addToFavs(movie);
        }
    }

    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                <div className="movie-overlay">
                    <button 
                        className={`favorite-btn ${favorite ? "active" : ""}`} 
                        onClick={onFavoriteClick}
                    >
                        &#9733;
                    </button>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date?.split("-")[0]}</p>
            </div>
            <div className="movie-overview">
                {movie.overview}
            </div>
        </div>
    );
}

export default MovieCard;