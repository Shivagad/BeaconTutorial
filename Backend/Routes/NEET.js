import express from 'express';
import { addNeetStudentResult, getAllNeetStudentResults, editNeetStudentResult, deleteNeetStudentResult } from '../Controller/NEET.js';

const router = express.Router();


router.post('/students', addNeetStudentResult);


router.get('/students', getAllNeetStudentResults);


router.put('/students/:id', editNeetStudentResult);


router.delete('/students/:id', deleteNeetStudentResult);

export default router;
