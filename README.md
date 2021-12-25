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

- Put resources on `/public`. You can use it by absolute path.

## Route

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

### Put Image

- `import Image from 'next/image';`

- `Image` must have `src` and `alt` along with `width` and `height`, or `layout='fill'`.

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
