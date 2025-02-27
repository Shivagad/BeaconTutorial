import express from 'express';
import { addFaculty, getAllFaculty, getFacultyById, editFaculty, deleteFaculty } from '../Controller/Faculty.js';

const router = express.Router();

// Routes for Faculty Management
router.post('/add', addFaculty); // Add new faculty
router.get('/getfaculty/all', getAllFaculty); // Get all faculty
router.get('/:id', getFacultyById); // Get faculty by ID
router.put('/edit/:id', editFaculty); // Update faculty by ID
router.delete('/delete/:id', deleteFaculty); // Delete faculty by ID

export default router;
