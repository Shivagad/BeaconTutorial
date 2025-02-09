import express from 'express';
import { 
    addNeetStudentResult, 
    getAllNeetStudentResults, 
    getNeetStudentResultById, 
    editNeetStudentResult, 
    deleteNeetStudentResult 
} from '../Controller/NEET.js';

const router = express.Router();

router.post('/students', addNeetStudentResult);
router.get('/students', getAllNeetStudentResults);
router.get('/students/:id', getNeetStudentResultById);
router.put('/students/:id', editNeetStudentResult);
router.delete('/students/:id', deleteNeetStudentResult);

export default router;
