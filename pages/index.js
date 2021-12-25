import Image from 'next/image';
import { useState, useEffect } from 'react';
import Seo from '../components/Seo';

export default function Home() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    (async () => {
      const { results } = await (await fetch(`/api/movies`)).json();
      setMovies(results);
    })();
  }, []);
  return (
    <div>
      <Seo title='Home' />
      {movies.length === 0 ? <h4>Loading...</h4> : null}
      <div className='moviesContainer'>
        {movies?.map((movie) => (
          <div key={movie.id} className='movieWrapper'>
            <div className='movieImage'>
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.original_title}
              />
            </div>
            <h4>{movie.original_title}</h4>
          </div>
        ))}
      </div>
      <style jsx>{`
        .moviesContainer {
          display: flex;
          flex-wrap: wrap;
        }
        .movieWrapper {
          width: calc(50% - 2rem);
          margin: 1rem;
          padding: 15px;
          background-color: #eee;
          border-radius: 15px;
        }
        .movieImage {
          height: 300px;
          position: relative;
          border-radius: 15px;
          overflow: hidden;
        }
        .movieWrapper h4 {
          text-align: center;
          margin-top: 0.5rem;
          margin-bottom: 0;
        }
      `}</style>
    </div>
  );
}
