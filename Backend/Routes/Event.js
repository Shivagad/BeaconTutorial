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


router.get('/geteventbyid/:id', getEventById);

router.put('/editevent/:id', editEventGallery);

router.delete('/deleteevent/:id', deleteEventGallery);

export default router;


