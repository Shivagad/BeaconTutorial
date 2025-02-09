import express from 'express';
import { addStudentResult,getResultById, getAllStudentResults, editStudentResult, deleteStudentResult } from '../Controller/10th.js';

const router = express.Router();

router.post('/students', addStudentResult);


router.get('/students', getAllStudentResults);


router.put('/students/:id', editStudentResult);


router.delete('/students/:id', deleteStudentResult);

router.get('/student/getbyid/:id',getResultById)

export default router;
