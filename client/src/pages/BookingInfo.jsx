import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddressLink from '../components/AddressLink';
import PlaceGallery from '../components/PlaceGallery';
import BookingDates from '../components/BookingDates';
import { ClimbingBoxLoader } from 'react-spinners';

function BookingInfo() {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) {
            const fetchBooking = async () => {
                try {
                    const response = await axios.get('/bookings');
                    const data = response.data.find(booking => booking._id === id);
                    if (data) {
                        setBooking(data);
                    } else {
                        setError('Booking not found.');
                    }
                } catch (error) {
                    setError('Error fetching booking details.');
                } finally {
                    setLoading(false);
                }
            };

            fetchBooking();
        }
    }, [id]);


    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <>
            {
                loading ? (
                    <div className="flex justify-center items-center min-h-screen" >
                        <ClimbingBoxLoader color="#F5385D" />
                    </div>
                ) : (
                    <div className='mt-4 -mx-8 px-8 py-8'>
                        <h1 className='text-3xl mb-4'>{booking?.place?.title}</h1>
                        <AddressLink place={booking?.place} />
                        <div className='bg-gray-200 p-6 my-6 rounded-2xl flex justify-between items-center'>
                            <div>
                                <h2 className='text-2xl mb-2'>Your booking information:</h2>
                                {booking && <BookingDates booking={booking} />}
                            </div>
                            <div className='bg-primary p-6 text-white rounded-2xl'>
                                <div>Total price</div>
                                <div className='text-3xl'>${booking?.price}</div>
                            </div>
                        </div>
                        <PlaceGallery place={booking?.place} />
                    </div>
                )
            }
        </>
    );
}

export default BookingInfo;
