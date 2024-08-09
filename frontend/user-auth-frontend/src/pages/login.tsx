import { useState, FormEvent } from 'react';
import axios from 'axios';

export default function Login() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:3001/auth/login', { username, password });
        console.log(response)
        localStorage.setItem('token', response.data.access_token);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button type="submit">Login</button>
        </form>
    );
}