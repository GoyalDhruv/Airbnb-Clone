import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="container mx-auto py-16 px-4">
            <header className="mb-8">
                <div className="text-start">
                    <Link to="/" className="text-4xl font-bold text-primary">
                        StayEase
                    </Link>
                </div>
            </header>

            <div className="flex items-center space-y-6">
                <div className="flex-1 text-left">
                    <h1 className="text-9xl font-bold text-gray-600">Oops!</h1>
                    <h2 className="text-4xl text-gray-400 mt-4">We can't seem to find the page you're looking for.</h2>
                    <h6 className="text-gray-500 mt-3 text-xl font-bold">Error code: 404</h6>

                </div>

                <div className="w-80 ml-8">
                    <img
                        src="https://a0.muscache.com/airbnb/static/error_pages/404-Airbnb_final-d652ff855b1335dd3eedc3baa8dc8b69.gif"
                        className="w-full"
                        alt="Girl has dropped her ice cream."
                    />
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
