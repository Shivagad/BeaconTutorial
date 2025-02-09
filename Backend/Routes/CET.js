import express from 'express';
import { 
    addCETStudentResult, 
    getAllCETStudentResults, 
    getCETResultById, 
    editCETStudentResult, 
    deleteCETStudentResult 
} from '../Controller/CET.js';

const router = express.Router();

router.post('/students', addCETStudentResult);


router.get('/students', getAllCETStudentResults);


router.get('/students/:id', getCETResultById);


router.put('/students/:id', editCETStudentResult);


router.delete('/students/:id', deleteCETStudentResult);

export default router;
