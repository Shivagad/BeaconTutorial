import express from 'express';
import {
  createTestimonial,
  getTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
  getSortedTestimonials,
  getThreeTestimonial
} from '../Controller/Testimonial.js'; // Adjust the path as needed

const router = express.Router();

router.post('/', createTestimonial);
router.get('/sorted', getSortedTestimonials);
router.get('/', getTestimonials);
router.get('/:id', getTestimonialById);
router.put('/:id', updateTestimonial);
router.delete('/:id', deleteTestimonial);
router.get("/test/three", getThreeTestimonial);

export default router;
