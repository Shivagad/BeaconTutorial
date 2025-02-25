import express from 'express';
import { createBlog, getAllBlogs, updateBlog, deleteBlog,getBlogById } from '../Controller/Blog.js';

const router = express.Router();

router.post('/blog/create', createBlog);
router.get('/blog/getall', getAllBlogs);
router.put('/blog/update/:id', updateBlog);
router.delete('/blog/delete/:id', deleteBlog);
router.get('/blog/:id', getBlogById);

export default router;
