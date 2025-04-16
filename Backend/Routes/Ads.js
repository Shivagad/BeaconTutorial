import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { uploadVideo, getVideo, deleteVideo,getVideoMetadata } from '../Controller/Ads.js';

const router = express.Router();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tempDir = path.join(__dirname, '..', 'temp');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, tempDir),
  filename: (req, file, cb) => cb(null, 'temp_upload.mp4')  // Temporary before renaming
});
const upload = multer({ storage });

router.post('/upload', upload.single('video'), uploadVideo);  // Admin
router.delete('/delete', deleteVideo);                        // Admin
router.get('/video', getVideo);     
router.get('/metadata', getVideoMetadata);                             // User

export default router;
