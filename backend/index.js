import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import authRouter from './routes/auth.routes.js';
import aiRouter from './routes/ai.route.js';
import pdfRouter from './routes/pdf.route.js';
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

// routes
app.use('/api/auth', authRouter);
app.use('/api/ai', aiRouter);
app.use('/api/pdf', pdfRouter);



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
