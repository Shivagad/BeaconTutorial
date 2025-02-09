import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './Database/db.js';
import cloudinaryConnect from "./Database/Cloudinary.js";
import cors from 'cors';
import bodyParser from 'body-parser'; 
import tenth from './Routes/10th.js';
import twelve from './Routes/12th.js';
import CET from './Routes/CET.js';
import JEE from './Routes/JEE.js';
import NEET from './Routes/NEET.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

connectDB();
cloudinaryConnect();


app.use(cors());  
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true })); 



app.use('/server/tenth', tenth);
app.use('/server/twelve', twelve);
app.use('/server/cet', CET);
app.use('/server/jee', JEE);
app.use('/server/neet', NEET);


app.get('/', (req, res) => {
    res.send('Server is running');
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
