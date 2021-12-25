import { useState, useEffect } from 'react';
import Seo from '../components/Seo';

export default function Home() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    (async () => {
      const { results } = await (await fetch('/api/movies')).json();
      setMovies(results);
    })();
  }, []);
  return (
    <div>
      <Seo title='Home' />
      {movies.length === 0 ? <h4>Loading...</h4> : null}
      {movies?.map((movie) => (
        <div key={movie.id}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.original_title}
          />
          <h4>{movie.original_title}</h4>
        </div>
      ))}
    </div>
  );
}
