const express = require('express');
const placesController = require('../controllers/placesController');
const authenticateToken = require('../middlewares/authenication');
const router = express.Router();

router.post('/places', authenticateToken, placesController.addNewPlaces);
router.get('/user-places', authenticateToken, placesController.getUserPlaces);
router.get('/places/:id', placesController.getPlaceById);
router.put('/places/:id', authenticateToken, placesController.updatePlaceById);
router.get('/allplaces', placesController.getallPlaces)

router.get('/testing', (req, res) => {
    res.json('testing ok');
});

module.exports = router;
