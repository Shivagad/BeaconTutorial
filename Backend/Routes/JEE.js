import express from 'express';
import { 
    addJEEStudentResult, 
    getAllJEEStudentResults, 
    getJEEStudentResultById, 
    editJEEStudentResult, 
    deleteJEEStudentResult 
} from '../Controller/JEE.js';

const router = express.Router();

router.post('/students', addJEEStudentResult);
router.get('/students', getAllJEEStudentResults);
router.get('/students/:id', getJEEStudentResultById);
router.put('/students/:id', editJEEStudentResult);
router.delete('/students/:id', deleteJEEStudentResult);

export default router;
