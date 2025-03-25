import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import User from "./models/User.model.js";
import Paper from "./models/Paper.model.js";
import connectDB from './db/connection.js';
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.send({ message: 'Welcome to the Express Backend!' });
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
