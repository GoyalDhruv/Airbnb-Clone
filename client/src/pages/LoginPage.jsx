import { useState, useContext } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import React from 'react';

function LoginPage() {

    const { setReady } = useContext(UserContext);

    const { setUser } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState('');

    async function loginSubmit(e) {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please fill in both fields.');
            return;
        }

        try {
            const response = await axios.post('/login', { email, password });
            setUser(response.data);
            setReady(true)
            setRedirect(true);
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message || 'Invalid email or password');
            } else if (error.request) {
                setError('Network error: Please check your connection.');
            } else {
                setError('Error: ' + error.message);
            }
        }
    }

    if (redirect) {
        return <Navigate to='/' />;
    }

    return (
        <div className="flex justify-center mt-32 h-screen px-4 sm:px-0">
            <div className="w-full max-w-md">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={loginSubmit}>
                    <input
                        type="email"
                        value={email}
                        placeholder="your@email.com"
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded"
                    />
                    <input
                        type="password"
                        value={password}
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded"
                    />
                    {error && <div className="text-red-800 text-sm mb-3 text-center">{error}</div>}
                    <button type="submit" className="primary mt-2">Login</button>
                    <div className='text-center py-2 text-gray-500'>
                        Don&apos;t have an account yet? <Link to='/register' className='underline text-primary hover:text-pink-700'>Register Now</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
