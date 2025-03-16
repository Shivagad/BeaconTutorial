import express from 'express';
import { addBatch, updateBatchById, getAllBatches, getBatchById, deleteBatchById } from '../Controller/Batches.js';

const router = express.Router();

router.post('/addbatch', addBatch);
router.put('/updatebatch/:id', updateBatchById);
router.get('/getallbatch', getAllBatches);
router.get('/getbatch/:id', getBatchById);
router.delete('/deletebatch/:id', deleteBatchById);

export default router;
