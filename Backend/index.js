import express from 'express';
import dotenv from 'dotenv';
import path from "path";
import { fileURLToPath } from "url";
import connectDB from './Database/db.js';
import cloudinaryConnect from "./Database/Cloudinary.js";
import cors from 'cors';
import tenth from './Routes/10th.js';
import twelve from './Routes/12th.js';
import CET from './Routes/CET.js';
import JEE from './Routes/JEE.js';
import NEET from './Routes/NEET.js';
import Poster from './Routes/Poster.js';
import Event from './Routes/Event.js';
import DashAdmin from './Routes/DashAdmin.js';
import Student from './Routes/Student.js';
import Testimonial from './Routes/Testimonial.js';
import Scholarship from './Routes/Scholarship.js';
import Inquiry from './Routes/Inquiry.js';
import Blog from './Routes/Blog.js';
import Course from './Routes/Course.js';
import Faculty from './Routes/Faculty.js';
import OtherExamResult from './Routes/OtherExamResults.js';
import Stat from './Routes/Stat.js';
import Batches from './Routes/Batches.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

connectDB();
cloudinaryConnect();
app.use(express.json()); 
app.use(cors());  
app.use(express.json({ limit: '1gb' })); 
app.use(express.urlencoded({ limit: '1gb', extended: true })); 

app.use('/server/tenth', tenth);
app.use('/server/twelve', twelve);
app.use('/server/cet', CET);
app.use('/server/jee', JEE);
app.use('/server/neet', NEET);
app.use('/server/poster', Poster);
app.use('/server/Event', Event);
app.use('/server/dashadmin', DashAdmin);
app.use('/server/student',Student)
app.use('/server/testimonial', Testimonial);
app.use('/server/scholarship',Scholarship);
app.use('/server',Inquiry);
app.use('/server',Blog);
app.use('/server/courses',Course);
app.use('/server/faculty',Faculty);
app.use('/server',OtherExamResult);
app.use('/server/stat',Stat);
app.use('/server/batches',Batches);


app.get('/', (req, res) => {
    res.send('Server is running');
});


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// console.log(__filename);
// console.log(__dirname);
app.use(express.static(path.join(__dirname, '..', 'src', 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.get("/s", (req, res) => {
  res.render("SignupOTP", { name: "Beacon Tutorial",otp:"123456"});
});


// app.listen(PORT, () => {
//     // console.log(`Server is running on port ${PORT}`);
// });



export default app;