const express = require('express');
const multer = require('multer');
const UserProfile = require('../models/UserProfile');
const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// Create a new User Profile
router.post('/create-profile', upload.single('profilePic'), async (req, res) => {
    try {
        const { name, email, phoneNo, educationalQualification, currentLocation, city, state, additionalInfo } = req.body;

        const userProfile = new UserProfile({
            name,
            email,
            phoneNo,
            educationalQualification,
            profilePic: req.file ? req.file.path : null,
            currentLocation,
            city,
            state,
            additionalInfo
        });

        await userProfile.save();
        res.status(201).json({ message: 'User profile created successfully', userProfile });
    } catch (error) {
        res.status(500).json({ error: 'Error creating user profile', details: error.message });
    }
});

// Get all User Profiles
router.get('/profiles', async (req, res) => {
    try {
        const profiles = await UserProfile.find();
        res.status(200).json(profiles);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching profiles' });
    }
});

module.exports = router;
