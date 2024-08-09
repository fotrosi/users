import { useState, FormEvent } from 'react';
import axios from 'axios';

export default function Register() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await axios.post('http://localhost:3001/users/register', { username, password, email });
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
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <button type="submit">Register</button>
        </form>
    );
}