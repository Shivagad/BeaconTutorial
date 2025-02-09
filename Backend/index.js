import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './Database/db.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

connectDB();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
