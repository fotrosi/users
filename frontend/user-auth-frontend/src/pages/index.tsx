import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { FaHeart } from 'react-icons/fa';

interface User {
    id: number;
    username: string;
    email: string;
}

export default function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState(null);
    const [msg, setMessage] = useState<string>();
    const [currentUsername, setCurrentUsername] = useState('');

    const handleDelete = async (userId: number) => {
        //console.log(`Delete user with ID: ${userId}`)
        if (!confirm("Are you sure?")) {
            return;
        }
        const token = localStorage.getItem('token')
        const response = await axios.delete(`http://localhost:3001/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setUsers(users.filter(user => user.id !== userId));
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get('http://localhost:3001/users', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                //console.log(response);
                setUsers(response.data);
                setCurrentUsername(localStorage.getItem('username') || '');
            } catch (err: any) {
                if (err.code == "ERR_BAD_REQUEST") {
                    setMessage("To view user list first login to system:")
                    localStorage.removeItem('token')
                } else {
                    setError(err.message);
                }
            }
        };
        fetchUsers();
    }, []);

    if (msg) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">{msg}</p>
                <br></br>
                <Link href="/login">
                    <p className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                        Go to Login
                    </p>
                </Link>
            </div>
        )
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">User List</h2>
            <div className="w-full max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {users && users.map(user => (
                        <div key={user.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{user.username}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
                            </div>
                            {user.username !== currentUsername ? (
                                <button
                                    onClick={() => handleDelete(user.id)}
                                    className="bg-red-600 text-white py-1 px-3 rounded-lg hover:bg-red-700 transition duration-300"
                                >
                                    Delete
                                </button>
                            ) : (
                                <FaHeart className="text-red-600 text-2xl" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}