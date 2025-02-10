import express from 'express';
import {
    addEventGallery,
    getAllEvents,
    editEventGallery,
    deleteEventGallery,
    getEventById
} from '../Controller/Event.js';

const router = express.Router();

router.post('/addevent', addEventGallery);

router.get('/getevent', getAllEvents);


router.get('/event/:id', getEventById);

router.put('/event/:id', editEventGallery);

router.delete('/event/:id', deleteEventGallery);

export default router;


