import Image from "next/image";
import Link from 'next/link';
import './page.css';

export default function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to User Auth App</h1>
      <nav>
        <ul className="nav-list">
          <li className="nav-item">
            <Link href="/register">
              <p>Register</p>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/login">
              <p>Login</p>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/users">
              <p>Users List</p>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
