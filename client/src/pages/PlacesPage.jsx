import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AccountNav from '../components/AccountNav';
import axios from 'axios';
import { ClimbingBoxLoader } from 'react-spinners';

function PlacesPage() {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const response = await axios.get('/user-places');
                setPlaces(response.data);
            } catch (err) {
                setError('Failed to load places.');
            } finally {
                setLoading(false);
            }
        };

        fetchPlaces();
    }, []);

    const truncateDescription = (description, maxLength = 700) => {
        return description.length > maxLength
            ? description.substring(0, maxLength) + '...'
            : description;
    };

    return (
        <div className="p-4">
            {loading ? <div className="flex justify-center items-center min-h-screen">
                <ClimbingBoxLoader color="#F5385D" />
            </div> :
                <>
                    <AccountNav />
                    <div className="text-center mb-4">
                        <Link to="/account/places/new" className="inline-flex items-center gap-1 py-2 px-6 rounded-full bg-primary text-white hover:bg-primary-dark">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Add new place
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {places.length > 0 ? (
                            places.map((place) => (
                                <Link to={`/account/places/${place._id}`} key={place._id} className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl hover:bg-gray-200">
                                    <div className="flex w-32 h-32 bg-gray-300 shrink-0 rounded-lg overflow-hidden">
                                        <img className="object-cover w-full h-full" src={`http://localhost:4000/api/uploads/${place.photos?.[0]}`} alt={place.title} />
                                    </div>
                                    <div>
                                        <h2 className="text-xl">{place.title}</h2>
                                        <p className="text-sm mt-2">{truncateDescription(place.description)}</p>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No places available.</p>
                        )}
                    </div>
                </>
            }
        </div>
    );
}

export default PlacesPage;
