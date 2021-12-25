import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function NavBar() {
  const router = useRouter();
  return (
    <nav>
      <Image src='/vercel.svg' alt='' width='142' height='32' />
      <div>
        <Link href='/'>
          <a className={router.pathname === '/' ? 'active' : ''}>Home</a>
        </Link>
        <Link href='/about'>
          <a className={router.pathname === '/about' ? 'active' : ''}>About</a>
        </Link>
      </div>
      <style jsx>{`
        nav {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 1rem;
          box-shadow: rgba(0, 0, 0, 0.3) 0px 30px 30px -24px;
        }
        a {
          text-transform: uppercase;
          padding: 0.5rem 1rem;
        }
        .active {
          color: tomato;
        }
      `}</style>
    </nav>
  );
}
