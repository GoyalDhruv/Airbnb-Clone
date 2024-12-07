import React, { useEffect, useState } from 'react'
import PhotosUploader from './PhotosUploader';
import Perks from './Perks';
import axios from 'axios';
import AccountNav from '../components/AccountNav';
import { Navigate, useParams } from 'react-router-dom';
import { ClimbingBoxLoader } from 'react-spinners';

function PlacesFormPage() {
    const { id } = useParams()

    const [loading, setLoading] = useState(true);


    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('')
    const [perks, setPerks] = useState([])
    const [bedroom, setbedroom] = useState(2)
    const [bathroom, setbathroom] = useState(2)
    const [maxGuests, setMaxGuests] = useState(1)
    const [redirect, setRedirect] = useState(false)
    const [price, setPrice] = useState(50);

    useEffect(() => {
        if (!id) {
            setLoading(false);
            return;
        }
        axios.get('/places/' + id).then(response => {
            const { data } = response;
            setTitle(data.title)
            setAddress(data.address)
            setAddedPhotos(data.photos)
            setDescription(data.description)
            setPerks(data.perks)
            setbedroom(data.bedroom)
            setbathroom(data.bathroom)
            setMaxGuests(data.maxGuests)
            setPrice(data.price)
        })
        setLoading(false);
    }, [id])

    async function savePlace(e) {
        e.preventDefault();
        const placeData = {
            title,
            address,
            addedPhotos,
            description,
            perks,
            bedroom,
            bathroom,
            maxGuests,
            price
        }
        if (id) {
            //update
            console.log(placeData)
            await axios.put('/places/' + id, placeData)

        }
        else {
            // add
            await axios.post('/places', placeData)
        }
        setRedirect(true)
    }

    if (redirect) {
        return <Navigate to='/account/places' />
    }

    return (
        <>
            {
                loading ? (
                    <div className="flex justify-center items-center min-h-screen" >
                        <ClimbingBoxLoader color="#F5385D" />
                    </div>
                ) : (
                    <div>
                        <AccountNav />
                        <form onSubmit={savePlace}>
                            <h2 className="text-2xl mt-4">Title</h2>
                            <p className="text-gray-500 text-sm">Give your place a short, catchy title.</p>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g., My Lovely Apartment"
                            />

                            <h2 className="text-2xl mt-4">Address</h2>
                            <p className="text-gray-500 text-sm">Enter the address where your place is located.</p>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="e.g., 123 Main St, Anytown"
                            />

                            <PhotosUploader addedPhotos={addedPhotos} setAddedPhotos={setAddedPhotos} />

                            <h2 className="text-2xl mt-4">Description</h2>
                            <p className="text-gray-500 text-sm">Provide a detailed description of your place.</p>
                            <textarea
                                className="h-40"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Add a description about the place"
                            />

                            <h2 className="text-2xl mt-4">Amenities</h2>
                            <p className="text-gray-500 text-sm">Select the amenities your place offers.</p>
                            <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                                <Perks selected={perks} onChange={setPerks} />
                            </div>

                            <h2 className="text-2xl mt-4">Check-in & Check-out Times</h2>
                            <p className="text-gray-500 text-sm">Specify the check-in and check-out times, considering a time window for cleaning.</p>
                            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
                                <div>
                                    <h3 className="mt-2 -mb-2">No of bedrooms</h3>
                                    <input
                                        type="number"
                                        value={bedroom}
                                        onChange={(e) => setbedroom(e.target.value)}
                                        placeholder="2"
                                    />
                                </div>
                                <div>
                                    <h3 className="mt-2 -mb-2">No of bathroom</h3>
                                    <input
                                        type="number"
                                        value={bathroom}
                                        onChange={(e) => setbathroom(e.target.value)}
                                        placeholder="2"
                                    />
                                </div>
                                <div>
                                    <h3 className="mt-2 -mb-2">Maximum Number of Guests</h3>
                                    <input
                                        type="number"
                                        value={maxGuests}
                                        onChange={(e) => setMaxGuests(e.target.value)}
                                        placeholder="4"
                                    />
                                </div>
                                <div>
                                    <h3 className="mt-2 -mb-2">Price per night</h3>
                                    <input
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder="50"
                                    />
                                </div>
                            </div>

                            <button className="primary my-4">Save</button>
                        </form>
                    </div>
                )
            }
        </>
    )
}

export default PlacesFormPage