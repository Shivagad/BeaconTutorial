import express from 'express';
import { createBlog, getAllBlogs, updateBlog, deleteBlog,getBlogById,updateBlogRating } from '../Controller/Blog.js';

const router = express.Router();

router.post('/blog/create', createBlog);
router.get('/blog/getall', getAllBlogs);
router.put('/blog/update/:id', updateBlog);
router.delete('/blog/delete/:id', deleteBlog);
router.get('/blog/:id', getBlogById);
router.put('/blog/update-rating/:id', updateBlogRating);

export default router;
