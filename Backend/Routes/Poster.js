import express from 'express';
import { 
    addPoster, 
    getAllPosters, 
    editPoster, 
    deletePoster, 
    getPosterById 
} from '../Controller/Poster.js';

const router = express.Router();

router.post('/addposter', addPoster);
router.get('/getallposter', getAllPosters);
router.put('/editposter/:id', editPoster);
router.delete('/deleteposter/:id', deletePoster);
router.get('/getposter/:id', getPosterById);

export default router;
