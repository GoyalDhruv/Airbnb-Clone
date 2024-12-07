const Booking = require('../models/Booking')
const User = require('../models/User')

exports.addBookings = async (req, res) => {
    const userData = req.user
    const { place, checkIn, checkOut, guests,
        name, phone, price } = req.body
    try {
        const bookingDoc = await Booking.create({
            place,
            user: userData.id,
            checkIn,
            checkOut,
            guests,
            name,
            phone,
            price
        })
        res.json(bookingDoc)
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Server error: Please try again later' });
    }
}

exports.getBookingForUser = async (req, res) => {
    const userData = req.user
    res.json(await Booking.find({ user: userData.id }).populate("place").populate("user"))

}

exports.getBookingsById = async (req, res) => {
    const id = req.params.id
    res.json(await Booking.find({ place: id }))
}