import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import BookingModal from './BookingModal';
import 'react-datepicker/dist/react-datepicker.css';
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookingWidget = ({ place }) => {
    const [checkIn, setCheckIn] = useState(null);
    const [checkOut, setCheckOut] = useState(null);
    const [guests, setGuests] = useState(1);
    const [isModalOpen, setModalOpen] = useState(false);
    const [error, setError] = useState('');
    const [booking, setBooking] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        const fetchBookingById = async () => {
            try {
                const response = await axios.get(`/allbookings/${id}`);
                setBooking(response.data);
            } catch (err) {
                setError('Failed to load booking.');
                console.error(err);
            }
        };

        fetchBookingById();
    }, [id]);

    // const excludeCheckInDate = booking[0]?.checkIn ? new Date(booking[0].checkIn) : null;
    // const excludeCheckOutDate = booking[0]?.checkOut ? new Date(booking[0].checkOut) : null;

    // Function to generate the array of excluded dates
    const getExcludedDates = () => {
        const allExcludedDates = booking.flatMap((item) => {
            const checkIn = item?.checkIn ? new Date(item.checkIn) : null;
            const checkOut = item?.checkOut ? new Date(item.checkOut) : null;

            if (checkIn && checkOut) {
                return eachDayOfInterval({
                    start: checkIn,
                    end: checkOut,
                });
            }
            return [];
        });

        return allExcludedDates;
    };

    const excludeDates = getExcludedDates();
    console.log(excludeDates);

    useEffect(() => {
        validateDates();
    }, [checkIn, checkOut]);

    const numberOfNights =
        checkIn && checkOut
            ? differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
            : 0;

    const validateDates = () => {
        if (checkIn && checkOut && checkOut <= checkIn) {
            setError('Check-out date must be after check-in date.');
        } else {
            setError('');
        }
    };

    const handleOpenModal = () => {
        if (!error && checkIn && checkOut) {
            setModalOpen(true);
        } else {
            setError('Please select valid check-in and check-out dates.');
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const totalPrice = numberOfNights * place?.price;
    const serviceFee = Math.floor(totalPrice / 10);
    const totalBeforeTaxes = totalPrice + serviceFee;

    return (
        <div className="bg-white shadow-lg p-6 rounded-2xl border border-gray-200">
            <div className="text-start mb-6">
                <div className="text-2xl font-semibold">
                    ${place?.price}
                    <span className="text-lg font-normal"> / night</span>
                </div>
            </div>

            <div className="border border-gray-300 rounded-lg">
                <div className="grid grid-cols-2 divide-x divide-gray-300">
                    <div className="p-4">
                        <label className="block text-gray-700 font-medium mb-1">
                            Check-in
                        </label>
                        <DatePicker
                            selected={checkIn}
                            onChange={(date) => setCheckIn(date)}
                            selectsStart
                            startDate={checkIn}
                            endDate={checkOut}
                            minDate={new Date()}
                            excludeDates={excludeDates}
                            placeholderText="Add date"
                            className="w-full rounded-md p-2 bookings_input"
                        />
                    </div>
                    <div className="p-4">
                        <label className="block text-gray-700 font-medium mb-1">
                            Check-out
                        </label>
                        <DatePicker
                            selected={checkOut}
                            onChange={(date) => setCheckOut(date)}
                            selectsEnd
                            startDate={checkIn}
                            endDate={checkOut}
                            minDate={checkIn || new Date()}
                            excludeDates={excludeDates}
                            placeholderText="Add date"
                            className="w-full rounded-md p-2 bookings_input"
                        />
                    </div>
                </div>
                <div className="p-4 border-t border-gray-300">
                    <label className="block text-gray-700 font-medium mb-1">
                        Guests
                    </label>
                    <input
                        type="number"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        min="1"
                        max={place?.maxGuests || 10}
                        className="w-full rounded-md p-2 bookings_input"
                    />
                </div>
            </div>

            {error && (
                <div className="text-red-600 mt-2 text-sm">{error}</div>
            )}

            <button
                onClick={handleOpenModal}
                className="w-full mt-4 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!!error || !checkIn || !checkOut}
            >
                Book this place
            </button>

            {numberOfNights > 0 && (
                <div className="mt-6 text-gray-700">
                    <div className="flex justify-between text-md mb-2">
                        <span>
                            ${place?.price} x {numberOfNights} nights
                        </span>
                        <span>${totalPrice}</span>
                    </div>
                    <div className="flex justify-between text-md mb-2">
                        <span>Service fee</span>
                        <span>${serviceFee}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between text-lg font-semibold">
                        <span>Total before taxes</span>
                        <span>${totalBeforeTaxes}</span>
                    </div>
                </div>
            )}

            <BookingModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                place={place}
                checkIn={checkIn}
                checkOut={checkOut}
                price={totalPrice}
                guests={guests}
                serviceFee={serviceFee}
                total={totalBeforeTaxes}
                numberOfNights={numberOfNights}
            />
        </div>
    );
};

BookingWidget.propTypes = {
    place: PropTypes.shape({
        price: PropTypes.number.isRequired,
        maxGuests: PropTypes.number,
        photos: PropTypes.arrayOf(PropTypes.string),
        title: PropTypes.string,
        address: PropTypes.string,
    }).isRequired,
};

export default BookingWidget;
