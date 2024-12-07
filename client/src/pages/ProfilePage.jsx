import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ClimbingBoxLoader } from 'react-spinners';
import PlacesPage from './PlacesPage';
import React from 'react';
import AccountNav from '../components/AccountNav';

function ProfilePage() {
    const { user, ready, setUser } = useContext(UserContext);
    let { subpage } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    subpage = subpage || 'profile';

    async function logout() {
        const { data } = await axios.post('/logout');
        if (data.success) {
            setUser(null);
            navigate('/');
        }
    }

    useEffect(() => {
        if (ready) {
            setLoading(false);
        }
    }, [ready]);

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
                        {subpage === 'profile' && (
                            <div className='text-center max-w-lg mx-auto mt-8'>
                                <h2 className='text-2xl font-semibold mb-4'>Profile Information</h2>
                                <p className='text-gray-700'>
                                    Logged in as <span className='font-bold'>{user?.name}</span> ({user?.email})
                                </p>
                                <button
                                    className='primary max-w-xs mt-6 px-6 py-2 text-white bg-primary rounded-lg hover:bg-pink-700 active:bg-pink-800 transition duration-200'
                                    onClick={logout}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                        {subpage === 'places' && <PlacesPage />}
                    </>
                )
            }
        </div>
    );
}

export default ProfilePage;
