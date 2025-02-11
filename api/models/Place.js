const mongoose = require('mongoose')

const PlaceSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: String,
    address: String,
    photos: [String],
    description: String,
    perks: [String],
    bedroom: Number,
    bathroom: Number,
    maxGuests: Number,
    price: Number,
})

const Place = mongoose.model("Place", PlaceSchema)
module.exports = Place;