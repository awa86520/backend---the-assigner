const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
     
    name: { type: String, required: true  },
    email: { type: String, required: true, unique: true },
    phoneNo: { type: String, required: true },
    educationalQualification: { type: String, required: true }, // E.g., "10th, 12th, Diploma, etc."
    profilePic: { type: String }, 
    currentLocation: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    additionalInfo: { type: String } // Optional
}, { timestamps: true });

module.exports = mongoose.model('UserProfile', userProfileSchema);
