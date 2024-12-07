import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Carousel from '../components/Carousel';
import { Link, useLocation } from 'react-router-dom';
import { ClimbingBoxLoader } from 'react-spinners';


function IndexPage() {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);

    const location = useLocation();

    const getQueryParams = () => {
        const params = new URLSearchParams(location.search);
        return {
            destination: params.get('destination') || '',
            // checkIn: params.get('checkIn') || '',
            // checkOut: params.get('checkOut') || '',
            guests: params.get('guests') || '',
        };
    };


    const fetchData = async () => {
        const { destination,
            //  checkIn, checkOut,
            guests } = getQueryParams();

        try {
            const query = new URLSearchParams({
                destination,
                // checkIn,
                // checkOut,
                guests
            }).toString();

            const response = await axios.get(`/allplaces?${query}`);
            setPlaces(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchData();
    }, [location.search]);

    const handleCarouselClick = (e) => {
        e.preventDefault();
    };

    return (
        <div>
            {
                loading ? (
                    <div className="flex justify-center items-center min-h-screen" >
                        <ClimbingBoxLoader color="#F5385D" />
                    </div>
                ) : (
                    <>
                        {
                            places.length > 0 ? (
                                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
                                    {places.map((place, index) => (
                                        <Link
                                            to={'/place/' + place._id}
                                            key={index}
                                            className='border p-4 rounded-2xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl duration-300'
                                        >
                                            <div onClick={handleCarouselClick} className='cursor-default'>
                                                <Carousel photo={place.photos} />
                                            </div>
                                            <div className='mt-4'>
                                                <h2 className='font-semibold text-lg text-gray-800'>{place.address}</h2>
                                                <h3 className='text-sm text-gray-600 truncate'>{place.title}</h3>
                                                <h3 className='text-md mt-2 text-gray-800'>
                                                    <span className='font-bold'>${place.price}</span> per night
                                                </h3>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className='flex flex-col items-center justify-center min-h-screen'>
                                    <div className='text-center text-6xl  text-primary'>
                                        No places found.
                                    </div>
                                </div>
                            )
                        }
                    </>
                )
            }
        </div>
    );
}

export default IndexPage;
