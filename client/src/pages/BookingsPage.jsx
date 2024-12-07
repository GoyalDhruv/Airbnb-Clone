import React, { useEffect, useState } from 'react';
import AccountNav from '../components/AccountNav';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BookingDates from '../components/BookingDates';
import { ClimbingBoxLoader } from 'react-spinners';


function BookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/bookings').then((response) => {
            setBookings(response.data);
            setLoading(false);
        });
    }, []);

    return (
        <div className='p-4'>
            {
                loading ? (
                    <div className="flex justify-center items-center min-h-screen" >
                        <ClimbingBoxLoader color="#F5385D" />
                    </div>
                ) : (
                    <>
                        <AccountNav />
                        <div className='mt-8 space-y-4'>
                            {bookings?.length > 0 && bookings.map((booking) => (
                                <Link
                                    to={`/account/bookings/${booking._id}`}
                                    key={booking?._id}
                                    className='flex gap-4 border rounded-2xl overflow-hidden shadow-md hover:shadow-lg duration-300 transition-transform transform hover:scale-95'
                                >
                                    <div className='w-48 h-32 md:h-48 overflow-hidden'>
                                        <img
                                            className='object-cover w-full h-full'
                                            src={'http://localhost:4000/api/uploads/' + booking?.place?.photos?.[0]}
                                            alt={booking?.place?.title}
                                        />
                                    </div>
                                    <div className='py-4 px-6 flex-grow'>
                                        <h2 className='text-xl font-semibold mb-2'>{booking?.place?.title}</h2>
                                        <BookingDates booking={booking} />
                                        <div className='flex items-center gap-1 mt-5 '>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-6 h-6 text-primary"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                />
                                            </svg>
                                            <span className='text-xl font-semibold'>
                                                Total price: <span className='text-primary'>${booking?.price}</span>
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </>
                )}
        </div>
    );
}

export default BookingsPage;
