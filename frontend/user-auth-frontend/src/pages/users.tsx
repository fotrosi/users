import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface User {
    id: number;
    username: string;
    email: string;
}

export default function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState(null);
    const [msg, setMessage] = useState<string>();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get('http://localhost:3001/users',{
                    headers:{
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsers(response.data);
            } catch (err: any) {
                if (err.code == "ERR_BAD_REQUEST") {
                    setMessage("go to login page.")
                } else {
                    setError(err.message);
                }
            }
        };
        fetchUsers();
    }, []);

    if (msg) {
        return (
            <Link href="/login">
                <p>Login</p>
            </Link>
        )
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <ul>
            {users && users.map(user => (
                <li key={user.id}>{user.username} ({user.email})</li>
            ))}
        </ul>
    );
}