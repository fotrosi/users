import React, { useEffect, useState } from 'react';
import './Layout.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token && token !== '');
    }, []);

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        router.push('/login');
    };

    return (
        <div className="layout">
            <header className="header flex justify-between items-center p-4 bg-gray-100 text-black dark:bg-gray-900 dark:text-white">
                <h1 className="text-2xl">My Demo App</h1>
                <div className="space-x-4">
                    {isLoggedIn ? (
                        <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleClick}>
                            Logout {localStorage.getItem("username")}
                        </button>
                    ) : (
                        <>
                            <Link href="/login">
                                <span className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Login
                                </span>
                            </Link>
                            <Link href="/register">
                                <span className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                    Register
                                </span>
                            </Link>
                        </>
                    )}
                </div>
            </header>
            <main className="main-content p-4">
                {children}
            </main>
            <footer className="footer p-4 bg-gray-800 text-white text-center">
                <p>© 2024 My App</p>
            </footer>
        </div>
    );
};

export default Layout;