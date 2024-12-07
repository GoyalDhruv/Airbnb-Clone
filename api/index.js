const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const imageDownload = require('image-downloader');
const userRoutes = require('./routes/userRoutes');
const placeRoutes = require('./routes/placeRoutes');
const bookingRoutes = require('./routes/bookingRoute');
const path = require('path');
const multer = require('multer')
require('dotenv').config();
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Database connected successfully');
}).catch((error) => {
    console.error('Database connection error:', error);
});

const uploadDir = path.join(__dirname, 'uploads');


app.use('/api/uploads', express.static(uploadDir));
app.use('/api', userRoutes);
app.use('/api', placeRoutes);
app.use('/api', bookingRoutes);


app.post('/api/upload-by-link', async (req, res) => {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg';

    try {
        await imageDownload.image({ url: link, dest: path.join(uploadDir, newName) });
        res.json(newName);
    } catch (error) {
        console.error('Image download error:', error);
        res.status(500).json({ error: 'Image download failed' });
    }
});

const photoMiddleware = multer({ dest: uploadDir });

app.post('/api/upload', photoMiddleware.single('photo'), (req, res) => {
    const { path: tempPath, originalname } = req.file;
    const ext = path.extname(originalname);
    const newPath = tempPath + ext;

    fs.renameSync(tempPath, newPath);

    const relativePath = newPath.replace(uploadDir, '').replace(/\\/g, '/').replace(/^\/+/, '');
    res.json(`${relativePath}`);
});




app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
