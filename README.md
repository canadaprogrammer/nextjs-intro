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
