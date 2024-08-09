import { useState, FormEvent, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Login() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token'); 
        if (token) {            
            router.push('/'); 
        }
    }, [router]);


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:3001/auth/login', { username, password });
        // console.log(response)
        if (response.data.access_token && response.data.access_token != "") {
            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('username', response.data.username);
            router.reload();
        } else {
            setErrorMessage('Invalid username or password');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Login</h2>

                {/* Error Message Section */}
                {errorMessage && (
                    <div className="mb-4 text-red-600 dark:text-red-400">
                        {errorMessage}
                    </div>
                )}

                <div className="mb-4">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"
                    />
                </div>
                <div className="mb-6">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 transition duration-300"
                >
                    Login
                </button>

                {/* Link to Register Page */}
                <div className="mt-4 text-center">
                    <p className="text-gray-600 dark:text-gray-400">
                        Don't have an account?{' '}
                        <Link href="/register">
                            <span className="text-blue-600 hover:underline dark:text-blue-400">Register here</span>
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}