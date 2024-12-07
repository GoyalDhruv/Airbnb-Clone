import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext.jsx';
// import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Header() {
    const { user } = useContext(UserContext);
    const [isScrolled, setIsScrolled] = useState(false);
    const [destination, setDestination] = useState('');
    // const [checkIn, setCheckIn] = useState(null);
    // const [checkOut, setCheckOut] = useState(null);
    const [guests, setGuests] = useState(1);
    const [isLargeSearchBoxOpen, setIsLargeSearchBoxOpen] = useState(false);
    const navigate = useNavigate();

    const handleScroll = () => {
        if (window.scrollY > 50) {
            setIsScrolled(window.scrollY);
        } else {
            setIsScrolled(false);
        }
    };

    const handleSmallBoxClick = () => {
        setIsLargeSearchBoxOpen(true);
    };

    const handleLargeBoxClose = () => {
        setIsLargeSearchBoxOpen(false);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (isScrolled) {
            handleLargeBoxClose();
        }
    }, [isScrolled]);

    const handleSearch = () => {
        const params = new URLSearchParams({
            destination,
            // checkIn: checkIn?.toISOString().split('T')[0] || '',
            // checkOut: checkOut?.toISOString().split('T')[0] || '',
            guests: guests.toString(),
        }).toString();
        setDestination('');
        setGuests('')
        navigate(`/?${params}`);
    };

    const renderSearchBox = () => (
        <div className="bg-white shadow-md rounded-full border flex items-center justify-between ">
            <div className="hover:bg-gray-200 rounded-full ps-5 py-1">
                <div className="text-gray-700">Where</div>
                <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Search destination"
                    className="bg-transparent outline-none w-50 bookings_input"
                />
            </div>
            {/* <div className="border-l h-6 border-gray-300 mx-2"></div> */}
            {/* <div className="pl-4 hover:bg-slate-200 rounded-full">
                <div className="text-gray-700">Check-in</div>
                <DatePicker
                    selected={checkIn}
                    onChange={setCheckIn}
                    selectsStart
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={new Date()}
                    placeholderText="Add dates"
                    className="p-2 bg-transparent outline-none bookings_input"
                />
            </div>
            <div className="pl-4 hover:bg-slate-200 rounded-full">
                <div className="text-gray-700">Check-out</div>
                <DatePicker
                    selected={checkOut}
                    onChange={setCheckOut}
                    selectsEnd
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={checkIn || new Date()}
                    placeholderText="Add dates"
                    className="p-2 bg-transparent outline-none bookings_input"
                />
            </div> */}
            <div className="border-l h-6 border-gray-300 mx-2"></div>
            <div className="hover:bg-gray-200 rounded-full ps-5 py-1">
                <div className="text-gray-700">Who</div>
                <input
                    type="number"
                    placeholder="Add guests"
                    value={guests}
                    min={1}
                    onChange={(e) => setGuests(e.target.value)}
                    className="p-2 bg-transparent outline-none bookings_input"
                />
            </div>
            <button className="text-white bg-primary hover:bg-red-600 p-2 rounded-full ml-2 mr-2" onClick={handleSearch}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </button>
        </div>
    );

    const renderHeader = (isScrolled) => (
        <header className={`flex justify-between items-center p-4 ${isScrolled ? 'fixed top-0 left-0 right-0 z-50 bg-white shadow-md' : 'shadow-lg'}`}>
            <Link to="/" className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 -rotate-90 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
                <span className="font-bold text-xl text-primary">StayEase</span>
            </Link>
            <div>
                {!isScrolled && (
                    <div className="hidden md:flex">
                        {renderSearchBox()}
                    </div>
                )}
                {isScrolled && !isLargeSearchBoxOpen && (
                    <div className="hidden sm:flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300" onClick={handleSmallBoxClick}>
                        <div>Anywhere</div>
                        {/* <div className="border-l border-gray-300"></div>
                        <div>Any week</div>*/}
                        <div className="border-l border-gray-300"></div>
                        <div>Add guests</div>
                        <button className="text-white rounded-full p-1" style={{ backgroundColor: "#F5385D" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </button>
                    </div>
                )}
                {isLargeSearchBoxOpen && renderSearchBox()}
            </div>
            <Link to={user ? '/account' : '/login'} className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4" data-toggle="tooltip" data-placement="bottom" title={user ? 'Profile' : 'Login'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                <div className="bg-gray-500 text-white rounded-full border border-gray overflow-hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 relative top-1">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                    </svg>
                </div>
                {!!user && (
                    <div className="hidden sm:block">
                        {user.name}
                    </div>
                )}
            </Link>
        </header>
    );

    return (
        <>
            {renderHeader(isScrolled)}
        </>
    );
}

export default Header;
