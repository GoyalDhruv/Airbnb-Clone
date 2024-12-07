const User = require('../models/User');
const bcrypt = require('bcryptjs'); // Import bcryptjs for hashing passwords
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for generating and verifying JWTs

const jwtSecret = process.env.JWT_SECRET || 'oqwdmnmfovenvensjdd';

// Register a new user
exports.registerUser = async (req, res) => {

    const { name, email, password } = req.body;
    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, 10)
        });
        res.json(userDoc);
    } catch (e) {
        res.status(422).json({ error: e.message });
    }
};

// Log in a user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userDoc = await User.findOne({ email });
        if (userDoc && bcrypt.compareSync(password, userDoc.password)) {
            // Generate a JWT with the user's email, id, and an expiration time
            jwt.sign({
                email: userDoc.email,
                id: userDoc._id
            }, jwtSecret, { expiresIn: '12h' }, (err, token) => {
                if (err) return res.status(500).json({ error: 'Error generating token' });

                // Set a cookie with the generated token, making it HTTP-only and secure in production
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                }).json(userDoc);
            });
        } else {
            res.status(422).json({ error: 'Invalid email or password' });
        }
    } catch (e) {
        res.status(500).json({ error: 'Server error: Please try again later' });
    }
};



exports.getUserProfile = async (req, res) => {
    const token = req.token
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.password = undefined;
        res.json({ user });
    } catch (e) {
        res.status(500).json({ error: 'Server error: Please try again later' });
    }
};



exports.logoutUser = (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(0)
    })
        .status(200)
        .json({ success: true, message: 'User logged out successfully' });
};

