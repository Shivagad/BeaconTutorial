import express from 'express';
import { addStudentResult,getResultById, getAllStudentResults, editStudentResult, deleteStudentResult,getAllExamResults } from '../Controller/10th.js';

const router = express.Router();

router.post('/students', addStudentResult);

router.get('/students', getAllStudentResults);

router.put('/students/:id', editStudentResult);

router.delete('/students/:id', deleteStudentResult);

router.get('/students/getbyid/:id',getResultById);

router.get('/result', getAllExamResults);

export default router;
