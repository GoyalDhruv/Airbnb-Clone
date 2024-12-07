import { useState } from 'react';
import React from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';

function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState({});

    function validateField(value, field) {
        const newError = { ...error };
        switch (field) {
            case 'name':
                if (!value.trim()) newError.name = 'Name is required';
                else delete newError.name;
                break;
            case 'email': {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value.trim()) {
                    newError.email = 'Email is required';
                } else if (!emailPattern.test(value)) {
                    newError.email = 'Email is invalid';
                } else {
                    delete newError.email;
                }
                break;
            }
            case 'password':
                if (!value.trim()) newError.password = 'Password is required';
                else if (value.length < 6) newError.password = 'Password must be at least 6 characters long';
                else delete newError.password;
                break;
            default:
                break;
        }
        setError(newError);
    }

    async function registerUser(e) {
        e.preventDefault();

        const newErrors = {};

        if (!name.trim()) {
            newErrors.name = 'Name is required';
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailPattern.test(email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!password.trim()) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
        }

        if (Object.keys(newErrors).length > 0) {
            setError(newErrors);
            return;
        }

        try {
            await axios.post('/register', { name, email, password });
            alert('Registration successful, Please login in');
            setName('');
            setEmail('');
            setPassword('');
            setError({});
            setRedirect(true);
        } catch (e) {
            alert('Registration failed: Please try again later', e);
        }
    }

    if (redirect) {
        return <Navigate to='/login' />;
    }

    return (
        <div className="flex justify-center mt-32 h-screen px-4 sm:px-0">
            <div className='w-full max-w-md'>
                <h1 className="text-4xl text-center mb-4 ">Register</h1>
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={registerUser}>
                    <input
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={name}
                        className={`w-full p-3 border ${error.name ? 'error-border' : 'border-gray-300'} rounded`}
                        onChange={(e) => {
                            setName(e.target.value);
                            validateField(e.target.value, 'name');
                        }}
                    />
                    {error.name && <div className='text-red-800 text-sm'>{error.name}</div>}

                    <input
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        value={email}
                        className={`w-full p-3 border ${error.email ? 'error-border' : 'border-gray-300'} rounded`}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            validateField(e.target.value, 'email');
                        }}
                    />
                    {error.email && <div className='text-red-800 text-sm'>{error.email}</div>}

                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        value={password}
                        className={`w-full p-3 border ${error.password ? 'error-border' : 'border-gray-300'} rounded`}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            validateField(e.target.value, 'password');
                        }}
                    />
                    {error.password && <p className='text-red-800 text-sm mb-3'>{error.password}</p>}

                    <button className="primary mt-2" type="submit">Register</button>

                    <div className='text-center py-2 text-gray-500'>
                        Already a member? <Link to='/login' className='underline text-primary hover:text-pink-700'>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;
