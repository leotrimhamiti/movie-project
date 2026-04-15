import MovieCard from "../components/MovieCard.jsx";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies, getMoviesByGenre } from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [genresBtn, setGenresBtn] = useState(null);

  const changeBtn = (genre) => {
    setGenresBtn(genre);}

  const loadGenre = async (genreId) => {
  const movies = await getMoviesByGenre(genreId);
  setMovies(movies);
  setSearchQuery("");};

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    changeBtn("");
    if(!searchQuery.trim()) return
    setLoading(true)

    

    try {
        const searchResults = await searchMovies(searchQuery)
        setMovies(searchResults)
        setError(null)
    } catch (err) {
        console.log(err)
        setError("Failed to search movies...")
    } finally {
        setLoading(false)
    }
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <div className="genres-content">
          
  <button className={genresBtn === "action" ? "genres-btn active" : "genres-btn"} 
    onClick={() => {changeBtn("action"); loadGenre(28);}}>Action</button>

  <button
   className={genresBtn === "adventure" ? "genres-btn active" : "genres-btn"}
   onClick={() => {changeBtn("adventure"); loadGenre(12)}}>Adventure</button>

<button
  className={genresBtn === "animation" ? "genres-btn active" : "genres-btn"}
  onClick={() => {changeBtn("animation"); loadGenre(16)}}>Animation</button>

<button
  className={genresBtn === "comedy" ? "genres-btn active" : "genres-btn"}
  onClick={() => {changeBtn("comedy"); loadGenre(35);}}>Comedy</button>
<button
  className={genresBtn === "crime" ? "genres-btn active" : "genres-btn"}
  onClick={() => {changeBtn("crime"); loadGenre(80);}}>Crime</button>

<button
  className={genresBtn === "documentary" ? "genres-btn active" : "genres-btn"}
  onClick={() => {changeBtn("documentary"); loadGenre(99);}}>Documentary</button>

<button
  className={genresBtn === "drama" ? "genres-btn active" : "genres-btn"}
  onClick={() => {changeBtn("drama"); loadGenre(18);}}>Drama</button>

<button
  className={genresBtn === "family" ? "genres-btn active" : "genres-btn"}
  onClick={() => {changeBtn("family"); loadGenre(10751);}}>Family</button>

<button
  className={genresBtn === "fantasy" ? "genres-btn active" : "genres-btn"}
  onClick={() => {changeBtn("fantasy"); loadGenre(14);}}>Fantasy</button>

<button className={genresBtn === "history" ? "genres-btn active" : "genres-btn"}
  onClick={() => {changeBtn("history"); loadGenre(36);}}>History</button>

<button
  className={genresBtn === "horror" ? "genres-btn active" : "genres-btn"}
  onClick={() => {changeBtn("horror"); loadGenre(27);}}>Horror</button>

<button
  className={genresBtn === "music" ? "genres-btn active" : "genres-btn"}
  onClick={() => {changeBtn("music"); loadGenre(10402)}}>Music</button>

<button
  className={genresBtn === "mystery" ? "genres-btn active" : "genres-btn"}
  onClick={() => {changeBtn("mystery"); loadGenre(9648);}}>Mystery</button>

<button
  className={genresBtn === "romance" ? "genres-btn active" : "genres-btn"}
  onClick={() => {changeBtn("romance"); loadGenre(10749);}}>Romance</button>

<button
  className={genresBtn === "scifi" ? "genres-btn active" : "genres-btn"}
  onClick={() => {changeBtn("scifi"); loadGenre(878)}}>Sci-Fi</button>

<button
  className={genresBtn === "thriller" ? "genres-btn active" : "genres-btn"}
  onClick={() => {changeBtn("thriller"); loadGenre(53);}}>Thriller</button>

<button
  className={genresBtn === "war" ? "genres-btn active" : "genres-btn"}
  onClick={() => {changeBtn("war"); loadGenre(10752)}}>War</button>

<button
  className={genresBtn === "western" ? "genres-btn active" : "genres-btn"}
  onClick={() => {changeBtn("western"); loadGenre(37)}}>Western</button>
</div>
    

        {error && <div className="error-message">{error}</div>}

     {loading ? (
    <div className="loading">Loading...</div>
     ) : (
    <div className="movies-grid">
      {movies.length > 0 ? (
        movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))
      ) : (
        /* This is your Empty State */
        <div className="empty-state">
          <h2>No Movies Found</h2>
          <p>We couldn't find what you're looking for. Try a different search!</p>
        </div>
      )}
    </div>
  )}
    </div>
  );
}

export default Home;