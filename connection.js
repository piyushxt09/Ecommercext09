import express from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import session from 'express-session';


const Schema = mongoose.Schema;

// Define the User schema
const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
const User = mongoose.model('User', userSchema);

import { fileURLToPath } from 'url';

const app = express();
const port = 4000;
const SECRET_KEY = 'piyushxt';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'dist')));
app.use(cors());
app.use(bodyParser.json());
app.use(session({ secret: SECRET_KEY, resave: false, saveUninitialized: true, cookie: { secure: false } }))

// The catch-all handler: for any request that doesn't match a static file, send back index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

//mongoDb connection
mongoose.connect('mongodb+srv://chauhanluckey4:Luckey%409289@cluster0.u5hpc.mongodb.net/Users', {
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});


//sign up route handling
app.post('/api/signup', async (req, res) => {
    const { username, password } = req.body;
    try {

        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: 'Username already exists' });
        }

        // Create a new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign({ userId: newUser._id, username: newUser.username }, SECRET_KEY, { expiresIn: '1h' });
        req.session.token = token;

        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
})


//login route handling
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Successful login
        const token = jwt.sign({ userId: user._id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
        req.session.token = token;
        res.status(200).json({ message: username });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Error logging in', error });
    }
})

function isAuthenticated(req, res, next) {
    if (req.session && req.session.token) {
        // Proceed to the next middleware or route handler
        next();
    } else {
        // If the user is not authenticated, redirect or send a forbidden response
        res.status(401).json({ message: 'Unauthorized access' });
    }
}

app.get('/dashboard', isAuthenticated, (req, res) => {
    // Respond with the dashboard data or HTML
    res.json({ message: 'Welcome to the dashboard' });
});


//  user logout code here
app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Failed to destroy session:', err);
            return res.status(500).json({ message: 'Failed to log out' });
        }
        res.clearCookie('connect.sid'); // Clear the session cookie
        res.status(200).json({ message: 'Logged out successfully' });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


