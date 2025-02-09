import express from 'express';
import { addTwelfthStudentResult, getAllTwelfthStudentResults, editTwelfthStudentResult, deleteTwelfthStudentResult, getTwelfthResultById } from '../Controller/12th.js';

const router = express.Router();


router.post('/students', addTwelfthStudentResult);


router.get('/students', getAllTwelfthStudentResults);


router.put('/students/:id', editTwelfthStudentResult);


router.delete('/students/:id', deleteTwelfthStudentResult);

router.get('/students/:id', getTwelfthResultById);

export default router;

