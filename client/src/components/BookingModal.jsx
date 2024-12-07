import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { UserContext } from '../UserContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookingModal = ({
    isOpen,
    onClose,
    place,
    checkIn,
    checkOut,
    guests,
    price,
    serviceFee,
    total,
    numberOfNights,
}) => {

    if (!isOpen) return null;

    const { user } = useContext(UserContext);
    const [name, setName] = useState(user?.name || '');
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            setName(user.name || '');
        }
    }, [user]);

    const validatePhone = (value) => {
        const regex = /^\d{10}$/;
        if (!value) {
            setPhoneError('Please enter your phone number.');
        } else if (!regex.test(value)) {
            setPhoneError('Please enter 10-digit phone number.');
        } else {
            setPhoneError('');
        }
    };

    const handleBooking = async () => {
        const bookingData = {
            place: place._id,
            checkIn,
            checkOut,
            guests,
            name,
            phone,
            price: total,
        };

        try {
            const response = await axios.post('/bookings', bookingData);
            const bookingId = response.data._id;
            onClose();
            navigate(`/account/bookings/${bookingId}`);
        } catch (error) {
            console.error('Booking failed:', error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white px-4 py-6 rounded-lg shadow-lg max-w-lg w-full relative">
                <div>
                    <div className='text-3xl font-semibold text-primary ps-4'>
                        {user ? 'Confirm and Pay' : 'Please Log In'}
                    </div>
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 bg-white text-gray-500 hover:bg-gray-100 p-1 rounded-full"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="p-6">
                    {!user ? (
                        <div className="text-center">
                            <p className="mb-4 text-gray-700">
                                You must be logged in to book a place.
                            </p>
                            <Link to="/login">
                                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition duration-300">
                                    Log In
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <div className="mb-4">
                                <h3 className="text-lg font-medium">Your Trip</h3>
                                <div className="grid grid-cols-3">
                                    <div>
                                        <div className="text-sm text-gray-500">Check-in</div>
                                        <div className="text-md text-gray-800">
                                            {checkIn?.toLocaleDateString()}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500">Check-out</div>
                                        <div className="text-md text-gray-800">
                                            {checkOut?.toLocaleDateString()}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500">Guests</div>
                                        <div className="text-md text-gray-800">{guests}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-lg font-medium">
                                    Your Information
                                </h3>
                                <div className='grid grid-cols-2 gap-4'>
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Full Name
                                        </label>
                                        <input
                                            id="name"
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full border border-gray-300 rounded-md p-2"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="phone"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Phone Number
                                        </label>
                                        <input
                                            id="phone"
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => {
                                                setPhone(e.target.value);
                                                validatePhone(e.target.value);
                                            }}
                                            className={`w-full border`}
                                            placeholder="1234567890"
                                        />
                                        {phoneError && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {phoneError}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className='border p-4 rounded-2xl'>
                                <div>
                                    <div className="flex items-center">
                                        <img
                                            src={`http://localhost:4000/api/uploads/${place?.photos?.[0]}`}
                                            alt={place.title}
                                            className="w-24 h-24 rounded-lg object-cover mr-4"
                                        />
                                        <div>
                                            <h3 className="text-md font-medium text-gray-800">
                                                {place.title}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {place.address}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 pt-2 border-t">
                                    <h3 className="text-lg font-medium mb-2">Price Details</h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-md text-gray-700">
                                            <span>
                                                ${place.price} x {numberOfNights} nights
                                            </span>
                                            <span>${price}</span>
                                        </div>
                                        <div className="flex justify-between text-md text-gray-700">
                                            <span>Service fee</span>
                                            <span>${serviceFee}</span>
                                        </div>
                                        <div className="border-t pt-2 flex justify-between text-md font-semibold text-gray-800">
                                            <span>Total before taxes</span>
                                            <span>${total}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={handleBooking}
                                className="w-full py-3 mt-4 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={!name || !phone || !!phoneError}
                            >
                                Confirm and Pay
                            </button>
                        </div>
                    )}
                </div>
            </div >
        </div >
    );
};

BookingModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    place: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string,
        address: PropTypes.string,
        photos: PropTypes.arrayOf(PropTypes.string),
        price: PropTypes.number.isRequired,
    }).isRequired,
    checkIn: PropTypes.instanceOf(Date),
    checkOut: PropTypes.instanceOf(Date),
    guests: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    price: PropTypes.number.isRequired,
    serviceFee: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    numberOfNights: PropTypes.number.isRequired,
};

export default BookingModal;
