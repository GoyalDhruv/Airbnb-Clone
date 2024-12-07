const Place = require('../models/Place');

exports.addNewPlaces = async (req, res) => {
    const { title, address, addedPhotos, description, perks,
        bedroom, bathroom, maxGuests, price } = req.body;
    const userData = req.user;

    try {
        const placeDoc = await Place.create({
            owner: userData.id,
            title,
            address,
            photos: addedPhotos,
            description,
            perks,
            bedroom,
            bathroom,
            maxGuests,
            price
        });
        res.json(placeDoc);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Server error: Please try again later' });
    }
}

exports.getUserPlaces = async (req, res) => {
    const userData = req.user;

    try {
        const places = await Place.find({ owner: userData.id });
        res.json(places);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Server error: Please try again later' });
    }
}

exports.getPlaceById = async (req, res) => {
    const { id } = req.params;

    try {
        const place = await Place.findById(id);
        if (!place) {
            return res.status(404).json({ error: 'Place not found' });
        }
        res.json(place);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Server error: Please try again later' });
    }
}

exports.updatePlaceById = async (req, res) => {
    const { id } = req.params;
    const { title, address, addedPhotos, description, perks,
        bedroom, bathroom, maxGuests, price } = req.body;
    const userData = req.user;

    try {
        const placeDoc = await Place.findById(id);
        if (!placeDoc) {
            return res.status(404).json({ error: 'Place not found' });
        }

        if (userData.id === placeDoc.owner.toString()) {
            placeDoc.set({
                title,
                address,
                photos: addedPhotos,
                description,
                perks,
                bedroom,
                bathroom,
                maxGuests,
                price
            });
            await placeDoc.save();
            res.json('updated');
        } else {
            res.status(403).json({ error: 'Unauthorized' });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Server error: Please try again later' });
    }
}

exports.getallPlaces = async (req, res) => {
    const { destination,
        //  checkIn, checkOut,
        guests } = req.query;

    try {
        let query = {};

        if (destination) {
            query.address = new RegExp(destination, 'i');
        }
        // if (checkIn) {
        //     query.checkIn = { $gte: new Date(checkIn) };
        // }
        // if (checkOut) {
        //     query.checkOut = { $lte: new Date(checkOut) };
        // }
        if (guests) {
            query.maxGuests = { $gte: Number(guests) };
        }

        const places = await Place.find(query);
        res.json(places);
    } catch (error) {
        console.error('Error fetching places:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
