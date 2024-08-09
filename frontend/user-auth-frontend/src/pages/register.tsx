import { useState, FormEvent } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Register() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const isValidEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!isValidEmail(email)) {
            setErrorMessage('Invalid email format.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:3001/users/register', { username, password, email });
            console.log(response)
            if (response.status != 201) {
                setErrorMessage(response.data.message);
            } else {
                router.push('/login');
            }
        } catch (error: any) {
            if (error.response) {  
                if (error.response.status === 409) {  
                    setErrorMessage('Username already exists.');  
                } else {  
                    setErrorMessage('An error occurred during registration.');  
                }  
            } else {  
                // Handle network errors or other unexpected scenarios  
                setErrorMessage('Network error or server not reachable.');  
            }  
        }
    };

    return (
        // <form onSubmit={handleSubmit}>
        //     <input
        //         type="text"
        //         value={username}
        //         onChange={(e) => setUsername(e.target.value)}
        //         placeholder="Username"
        //     />
        //     <input
        //         type="password"
        //         value={password}
        //         onChange={(e) => setPassword(e.target.value)}
        //         placeholder="Password"
        //     />
        //     <input
        //         type="email"
        //         value={email}
        //         onChange={(e) => setEmail(e.target.value)}
        //         placeholder="Email"
        //     />
        //     <button type="submit">Register</button>
        // </form>
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Register</h2>

                {errorMessage && (
                    <div className="mb-4 text-red-600 dark:text-red-400">{errorMessage}</div>
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

                <div className="mb-4">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"
                    />
                </div>

                <div className="mb-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 transition duration-300"
                >
                    Register
                </button>

                <div className="mt-4 text-center">
                    <p className="text-gray-600 dark:text-gray-400">
                        Already have an account?{' '}
                        <Link href="/login">
                            <span className="text-blue-600 hover:underline dark:text-blue-400">Login</span>
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}