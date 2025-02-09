import express from 'express';
import { addTwelfthStudentResult, getAllTwelfthStudentResults, editTwelfthStudentResult, deleteTwelfthStudentResult } from '../Controller/12th.js';

const router = express.Router();


router.post('/students', addTwelfthStudentResult);


router.get('/students', getAllTwelfthStudentResults);


router.put('/students/:id', editTwelfthStudentResult);


router.delete('/students/:id', deleteTwelfthStudentResult);

export default router;
