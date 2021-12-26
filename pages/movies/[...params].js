import Image from 'next/image';
import { useRouter } from 'next/router';
import Seo from '../../components/Seo';

export default function Detail({ params, query }) {
  // const router = useRouter();
  // const [title, id] = router.query.params || [];
  const [title, id] = params;
  const { poster } = query;
  return (
    <div>
      <Seo title={title} />
      {!title && <h4>Loading...</h4>}
      <div className='moviesContainer'>
        <div className='movieWrapper'>
          <div className='movieImage'>
            <Image
              src={`https://image.tmdb.org/t/p/w500${poster}`}
              alt={title}
              layout='fill'
              objectFit='cover'
            />
          </div>
          <h4>{title}</h4>
        </div>
      </div>
      <style jsx>{`
        .movieWrapper {
          width: calc(100% - 2rem);
          margin: 1rem;
          padding: 15px;
          border-radius: 15px;
        }
        .movieImage {
          height: 700px;
          position: relative;
          border-radius: 15px;
          overflow: hidden;
        }
        .movieWrapper h4 {
          text-align: center;
          margin-top: 0.5rem;
          margin-bottom: 0;
          font-size: 1.5em;
        }
      `}</style>
    </div>
  );
}

export function getServerSideProps(content) {
  const {
    params: { params },
  } = content;
  const { query } = content;
  return {
    props: {
      params,
      query,
    },
  };
}
