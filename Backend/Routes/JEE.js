import express from 'express';
import { addJEEStudentResult, getAllJEEStudentResults, editJEEStudentResult, deleteJEEStudentResult } from '../Controller/JEE.js';

const router = express.Router();


router.post('/students', addJEEStudentResult);


router.get('/students', getAllJEEStudentResults);


router.put('/students/:id', editJEEStudentResult);


router.delete('/students/:id', deleteJEEStudentResult);

export default router;
