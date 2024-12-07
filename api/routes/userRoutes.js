const express = require('express');
const userController = require('../controllers/userController');
const { validateRegister, validateLogin } = require('../middlewares/userValidation');
const authenticateToken = require('../middlewares/authenication');
const router = express.Router();

router.post('/register', validateRegister, userController.registerUser);
router.post('/login', validateLogin, userController.loginUser);
router.get('/profile',authenticateToken, userController.getUserProfile);
router.post('/logout', userController.logoutUser)

router.get('/test', (req, res) => {
    res.json('test ok')
})

module.exports = router;
