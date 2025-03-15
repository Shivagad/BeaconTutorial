import express from 'express';
import {
    addOtherExamResult,
    getAllOtherExamResults,
    getOtherExamResultById,
    editOtherExamResult,
    deleteOtherExamResult
} from '../Controller/OtherExamResults.js';

const router = express.Router();

// Add a new Other Exam Result
router.post('/exam/otherexam', addOtherExamResult);

// Get all Other Exam Results
router.get('/other-exam-results', getAllOtherExamResults);

// Get a specific Other Exam Result by ID
router.get('/other-exam-results/:id', getOtherExamResultById);

// Edit an existing Other Exam Result
router.put('/other-exam-results/:id', editOtherExamResult);

// Delete an Other Exam Result
router.delete('/other-exam-results/:id', deleteOtherExamResult);

export default router;
