import Image from 'next/image';
import { useRouter } from 'next/router';
// import { useState, useEffect } from 'react';
import Seo from '../components/Seo';

export default function Home({ results }) {
  // const [movies, setMovies] = useState();
  // useEffect(() => {
  //   (async () => {
  //     const { results } = await (await fetch(`/api/movies`)).json();
  //     setMovies(results);
  //   })();
  // }, []);
  const router = useRouter();
  const onClick = (id, title, poster) =>
    router.push(
      {
        pathname: `/movies/${title}/${id}`,
        query: {
          poster,
        },
      },
      `/movies/${title}/${id}`
    );
  return (
    <div>
      <Seo title='Home' />
      {!results && <h4>Loading...</h4>}
      <div className='moviesContainer'>
        {results?.map((movie) => (
          <div
            key={movie.id}
            className='movieWrapper'
            onClick={() =>
              onClick(movie.id, movie.original_title, movie.poster_path)
            }
          >
            <div className='movieImage'>
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.original_title}
                layout='fill'
                objectFit='cover'
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
          cursor: pointer;
          transition: 0.2s transform ease-in;
        }
        .movieWrapper:hover {
          transform: scale(1.02);
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

export async function getServerSideProps() {
  const { results } = await (
    await fetch(`http://localhost:3000/api/movies`)
  ).json();
  return {
    props: {
      results,
    },
  };
}
