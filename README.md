# Next.js Introduction

- Next.js is the React Framework for production. It provides hybrid static & server rendering, TypeScript support, smart bundling, route pre-fetching, and more. No config needed.

  - If you create a page_name.js under pages folder, it's going to show the component when you're going to /page_name.

  - Pages will be pre render on Next.js, you can see HTML even though when there is low connection or JavaScript unable. It's really good for SEO.

    - Create-React-APP(CRA) is going to be client side render, so the source code just has `<div id="root"></div>`. When there is low connection or JavaScript unable, you will see white screen without contents.

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
        <>
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
        </>
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
