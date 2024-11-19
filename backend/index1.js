const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files

// Database Connection
mongoose.connect('mongodb+srv://aay14155:Awa86520@cluster0.pgvamuv.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log('MongoDB connected successfully.');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
});

// Routes
app.use('/api/users', userRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(Server is running on http://localhost:${PORT});
});