// controllers/UsersController.js
const sha1 = require('sha1');
const User = require('./User');

async function postNew(req, res) {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email) {
        return res.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
        return res.status(400).json({ error: 'Missing password' });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash password
    const hashedPassword = sha1(password);

    // Create new user
    const newUser = new User({ email, password: hashedPassword });

    try {
        // Save user to database
        const savedUser = await newUser.save();
        // Return response
        return res.status(201).json({ email: savedUser.email, id: savedUser._id });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { postNew };
