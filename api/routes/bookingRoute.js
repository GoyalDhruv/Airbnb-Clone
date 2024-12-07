const express = require('express');
const authenticateToken = require('../middlewares/authenication');
const bookingController = require('../controllers/bookingController');
const router = express.Router();

router.post('/bookings', authenticateToken, bookingController.addBookings);
router.get('/bookings', authenticateToken, bookingController.getBookingForUser);
router.get('/allbookings/:id', bookingController.getBookingsById)


module.exports = router;