# Next.js Introduction

- Next.js is the React Framework for production. It provides hybrid static & server rendering, TypeScript support, smart bundling, route pre-fetching, and more. No config needed.

  - If you create a page_name.js under pages folder, it's going to show the component when you're going to /page_name.

  - Pages will be pre render on Next.js, you can see HTML even though when there is low connection or JavaScript unable. It's really good for SEO.

    - Create-React-APP(CRA) is going to be client side render, so the source code just has `<div id="root"></div>`. When there is low connection or JavaScript unable, you will see white screen without contents.

- Library vs Framework

  - You call and use a library.

  - However, you put code on a specific place, and a framework calls your code.

## Installation

- Create next app

  - `npx create-next-app@latest`

    - If using typescript, `npx create-next-app@latest --typescript`

- Execute, `npm run dev`

- Initialize

  - Remove folders under pages folder

  - Create index.js under pages folder

    - ```jsx
      export default function Home() {
        return (
          <div>
            <h1>Hello</h1>
          </div>
        );
      }
      ```

- Put resources on `/public`. You can use it as a root directory

## Navigation

- Use `Link` for `href`, style and className can't be on Link

- Use `useRouter` for route information

- Created `\components\NavBar.js

  - ```jsx
    import Link from 'next/link';
    import { useRouter } from 'next/router';

    export default function NavBar() {
      const router = useRouter();
      return (
        <nav>
          <Link href='/'>
            <a style={{ color: router.pathname === '/' ? 'red' : 'blue' }}>
              Home
            </a>
          </Link>
          <Link href='/about'>
            <a style={{ color: router.pathname === '/about' ? 'red' : 'blue' }}>
              About
            </a>
          </Link>
        </nav>
      );
    }
    ```

- On `index.js`

  - ```jsx
    import NavBar from '../components/NavBar';

    export default function Home() {
      return (
        <div>
          <NavBar />
          <h1>Hello</h1>
        </div>
      );
    }
    ```

## CSS Modules

- Create `NavBar.module.css`

  - ```css
    .link {
      text-decoration: none;
    }

    .active {
      color: tomato;
    }
    ```

- On `NavBar.js`

  - ```jsx
    import styles from './NavBar.module.css';

    <a className={router.pathname === '/' ? styles.active : ''}>Single Class</a>
    <a className={`${styles.link} ${router.pathname === '/' ? styles.active : ''}`}>Multiple Way 1</a>
    <a className={[styles.link, router.pathname === '/about' ? styles.active : ''].join(' ')}>Multiple Way 2</a>
    ```

## Styles JSX

- The scope of style jsx is only for the component because the style set up with a random classname.

- It's JavaScript string, so you can use props inside the style.

- On `NavBar.js`

  - ```jsx
    <a className={router.pathname === '/' ? 'active' : ''}>Home</a>

    <style jsx>{`
      a {
        text-decoration: none;
      }
      .active {
        color: tomato;
      }
    `}</style>
    ```

## Global Layout

- There is Global CSS on `/styles/globals.css`, but it cannot be imported from files other than `/pages/_app.js`

- Create `/pages/_app.js`

  - It's a blueprint. `Component` will be the pages. The others will be used as global.

  - Global style needs `global`.

  - ```jsx
    import NavBar from '../components/NavBar';
    import '../styles/globals.css';

    export default function App({ Component, pageProps }) {
      return (
        <>
          <NavBar />
          <Component {...pageProps} />
          <style jsx global>{`
            a {
              color: blue;
            }
          `}</style>
        </>
      );
    }
    ```

  - Remove `<NavBar />` from `index.js` and `about.js`.

## Common Patterns

### Add `Layout.js`

- Create `./components/Layout.js`

  - ```jsx
    import NavBar from './NavBar';

    export default function Layout({ children }) {
      return (
        <>
          <NavBar />
          <div>{children}</div>
        </>
      );
    }
    ```

- On `_app.js`

  - ```jsx
    import Layout from '../components/Layout';
    ...
      return (
        <Layout>
          <Component {...PageProps} />
        </Layout>
      );
    ```

### Put `Head`

- Create `./components/Seo.js`

  - ```jsx
    import Head from 'next/head';

    export default function Seo({ title }) {
      return (
        <Head>
          <title>{title} | Next.js Movies</title>
        </Head>
      );
    }
    ```

- On `index.js`

  - ```jsx
    import Seo from '../components/Seo';
    ...
      return (
        <div>
          <Seo title="Home" />
          ...
      );
    ```

## Fetch Data

### Use API from TheMovieDB

- Copy API key from `themoviedb.org/settings/api`

- Information related to getting popular movies from `https://developers.themoviedb.org/3/movies/get-popular-movies`

  - `https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>`

- The URL of an image; the info is on `https://developers.themoviedb.org/3/getting-started/images`

  - `https://image.tmdb.org/t/p/w500/poster_path`

- Add the domain for using the image

  - On `next.config.js`

    - ```js
      module.exports = {
        ...
        images: {
          domains: ['image.tmdb.org'],
        },
      };
      ```

### Put Image

- `import Image from 'next/image';`

- `Image` must have `src` and `alt` along with `width` and `height`, or `layout='fill'`.

- Using `layout='fill'` along with the parent style to `position:relative;` with a width.

- To apply `border-radius` on `Image`

  - The parent style: `border-radius:15px;overflow:hidden;`

  - The image style: `layout='fill' objectFit='cover'`

### Example

- On `index.js`

  - ```jsx
    import Image from 'next/image';
    import { useState, useEffect } from 'react';
    import Seo from '../components/Seo';

    const API_KEY = 'f88b...';

    export default function Home() {
      const [movies, setMovies] = useState([]);
      useEffect(() => {
        (async () => {
          const { results } = await (
            await fetch(
              `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
            )
          ).json();
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
    ```

## Redirect and Rewrite

- Redirect: A user will see the url is changed.

- Rewrite: The source URL will only show to a user.

- Hide API Key

  - Use `rewrites()` to hide it from the Network

  - Put the key on `.env`

    - Create `.env`: `API_KEY=...`

    - Add `.env` to `.gitignore`

    - Add `const API_KEY = process.env.API_KEY;` instead of the key

- On `next.config.js`

  - ```js
    const API_KEY = process.env.API_KEY;

    module.exports = {
      reactStrictMode: true,
      async redirects() {
        return [
          {
            source: '/contact',
            destination: '/form',
            permanent: false,
          },
        ];
      },
      async rewrites() {
        return [
          {
            source: '/api/movies',
            destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
          },
        ];
      },
    };
    ```

- On `index.js`

  - ```jsx
    // const API_KEY = '...';

    useEffect(() => {
      (async () => {
        const { results } = await (await fetch(`/api/movies`)).json();
        setMovies(results);
      })();
    }, []);
    ```

### More Uses of Redirect URL

- Redirect URL with a path

  - ```js
    source: '/old-blog/:path',
    destination: '/new-blog/:path',
    ```

- Redirect URL with all paths

  - ```js
    source: '/old-blog/:path*',
    destination: '/new-blog/:path*',
    ```

- Redirect URL to external URL

  - ```js
    source: '/site',
    destination: 'http://example.com',
    ```

## Server Side Rendering

- The page will render after getting data, so it's not visible until getting the data. And the source code will have all html, so it's better for SEO.

- Inside the function `getServerSidePros()` will only run on the server.

- Get the data as `props`

- On `index.js`

  - ```jsx
    export default function Home({results}) {
      // const [movies, setMovies] = useState();
      // useEffect(() => {
      //   (async () => {
      //     const { results } = await (await fetch(`/api/movies`)).json();
      //     setMovies(results);
      //   })();
      // }, []);
      return (
        ...
    }

    export async function getServerSideProps() {
      const { results } = await (await fetch(`http://localhost:3000/api/movies`)).json();
      return {
        props: {
          results,
        }
      }
    }
    ```

## Routes

### Static Routes

- For /about

  - Create `/pages/about.js`

- For /movies and /movies/all

  - Create `/pages/movies/index.js` and `/pages/movies/all.js`

### Dynamic Routes

- For /movies/:id

  - Create `/pages/movies/[id].js`

  - Get `id` from `useRouter().query.id`

  - ```jsx
    import { useRouter } from 'next/router';

    export default function Detail() {
      const router = useRouter();
      console.log(router.query.id);
      return 'detail';
    }
    ```

## Movie Detail page

- Send query by `useRouter().push(url: url, as: url);`

  - ```js
    router.push(
      {
        // /movies/:id?title=<title>&poster=<poster>
        pathname: `/movies/${id}`,
        query: {
          title,
          poster,
        },
      },
      // Show the url to /movies/:id on browser, but the query can get from router.query
      `/movies/${id}`
    );
    ```

- Send query by `Link`

  - ```jsx
    <Link
      href={{
        pathname: `/movies/${movie.id}`,
        query: {
          title: movie.original_title,
          poster: movie.poster_path,
        },
      }}
      as={`/movies/${movie.id}`}
    >
      <a>{movie.original_title}</a>
    </Link>
    ```

- On `next.config.js`

  - ```jsx
    module.exports = {
      ...
      async rewrites() {
        return [
          ...
          {
            source: '/api/movies/:id',
            destination: `https://api.themoviedb.org/3/movie/{movie_id}?api_key=&{API_KEY}`
          },
        ]
      },
    };
    ```

- On `index.js`

  - ```jsx
    import { useRouter } from 'next/router';

    export default function Home({ results }) {
      const router = useRouter();
      const onClick = (id, title, poster) =>
        router.push(
          {
            pathname: `/movies/${id}`,
            query: {
              title,
              poster,
            },
          },
          `/movies/${id}`
        );
      return (
        ...
              <div
                key={movie.id}
                className='movieWrapper'
                onClick={() =>
                  onClick(movie.id, movie.original_title, movie.poster_path)
                }
              >
    ```

- On `[id].js`

  - ```jsx
    import Image from 'next/image';
    import { useRouter } from 'next/router';
    import Seo from '../../components/Seo';

    export default function Detail() {
      const {
        query: { title, poster },
      } = useRouter();
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
    ```

## Catch All

- On `index.js`

  - ```jsx
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
    ```

- Change `[id].js` to `[...params].js`

  - Method 1: `useRouter()`

    - ```jsx
      export default function Detail() {
        const router = useRouter();
        const [title, id] = router.query.params || [];
        const {poster} = router.query;
        ...
      }
      ```

  - Method 2: `getServerSideProps()`

    - ```jsx
      export default function Detail({ params, query }) {
        const [title, id] = params;
        const { poster } = query;
        ...
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
      ```
