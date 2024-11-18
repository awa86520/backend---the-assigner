const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint to handle form submission
app.post('/contact', (req, res) => {
    const { name, email, phone, message, address, subject } = req.body;

    if (!name || !email || !phone || !message || !address || !subject) {
        return res.status(400).json({ error: 'All fields are required!' });
    }

    const newMessage = {
        id: Date.now(),
        name,
        email,
        phone,
        message,
        address,
        subject,
    };

    const messagesFile = path.join(__dirname, 'data', 'messages.json');

    // Read existing messages
    fs.readFile(messagesFile, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Error reading data.' });

        const messages = data ? JSON.parse(data) : [];
        messages.push(newMessage);

        // Write new message to file
        fs.writeFile(messagesFile, JSON.stringify(messages, null, 2), (err) => {
            if (err) return res.status(500).json({ error: 'Error saving message.' });

            res.status(201).json({ message: 'Message saved successfully!' });
        });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
