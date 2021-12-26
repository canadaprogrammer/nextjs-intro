import Image from 'next/image';
import Link from 'next/link';
import Seo from '../../components/Seo';

export default function Detail({ results }) {
  return (
    <div>
      <Seo title={results.title} />
      {!results.title && <h4>Loading...</h4>}
      <div className='moviesContainer'>
        <div className='movieImage'>
          <Image
            src={`https://image.tmdb.org/t/p/w500${results.poster_path}`}
            alt={results.title}
            layout='fill'
            objectFit='cover'
          />
        </div>
        <div className='movieDescription'>
          <h4>{results.title}</h4>
          <p>{results.overview}</p>
          <p>
            <strong>Genres:</strong>{' '}
            <ul>
              {results.genres.map((genre) => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          </p>
          <p>
            <strong>Homepage:</strong>{' '}
            <Link href={results.homepage}>
              <a target='_blank'>{results.homepage}</a>
            </Link>
          </p>
          <p>
            <strong>Release:</strong> {results.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {results.vote_average}
          </p>
        </div>
      </div>
      <style jsx>{`
        .moviesContainer {
          display: flex;
          margin-top: 1rem;
        }
        .movieDescription {
          width: calc(100% - 170px - 1rem);
          margin-left: 1rem;
        }
        .movieImage {
          width: 170px;
          height: 260px;
          position: relative;
          border-radius: 15px;
          overflow: hidden;
        }
        h4 {
          font-size: 1.5em;
        }
        h4,
        p,
        ul {
          margin-top: 0;
          margin-bottom: 0.5rem;
        }
        ul {
          display: inline-flex;
          padding-left: 0;
          list-style: none;
          gap: 8px;
          margin-bottom: 0;
        }
        li:not(:last-of-type)::after {
          content: ', ';
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps(content) {
  const id = content.params.params[1];
  const results = await (
    await fetch(`http://localhost:3000/api/movies/${id}`)
  ).json();
  return {
    props: {
      results,
    },
  };
}
