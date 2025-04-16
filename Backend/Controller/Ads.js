import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tempDir = path.join(__dirname, '..', 'temp');

if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

const videoName = 'uploaded_video.mp4';

export const uploadVideo = (req, res) => {
  if (!req.file) return res.status(400).send('No video uploaded');

  const tempPath = req.file.path;
  const targetPath = path.join(tempDir, videoName);

  fs.rename(tempPath, targetPath, (err) => {
    if (err) return res.status(500).send('Failed to move video');
    res.status(200).json({ message: 'Video uploaded successfully' });
  });
};



export const deleteVideo = (req, res) => {
  const videoPath = path.join(tempDir, videoName);
  if (!fs.existsSync(videoPath)) return res.status(404).send('No video to delete');
  fs.unlink(videoPath, (err) => {
    if (err) return res.status(500).send('Error deleting video');
    res.status(200).json({ message: 'Video deleted successfully' });
  });
};



export const getVideoMetadata = (req, res) => {
    const videoPath = path.join(tempDir, 'uploaded_video.mp4');
    
    // Check if the video file exists
    fs.access(videoPath, fs.constants.F_OK, (err) => {
      if (err) {
        console.error('Video not found:', err);
        return res.status(404).json({ error: 'No video found' });
      }
      
      // Return metadata about the video
      res.status(200).json({
        title: "Uploaded Video",
        filename: "uploaded_video.mp4"
      });
    });
  };
  
  // Stream video
  export const getVideo = (req, res) => {
    const videoPath = path.join(tempDir, 'uploaded_video.mp4');
    console.log('Streaming video from:', videoPath);
    
    // Check if the video file exists
    fs.access(videoPath, fs.constants.F_OK, (err) => {
      if (err) {
        console.error('Video not found:', err);
        return res.status(404).send('No video found');
      }
  
      // Get file stats for range support
      const stat = fs.statSync(videoPath);
      const fileSize = stat.size;
      const range = req.headers.range;
  
      if (range) {
        // Handle range requests (important for video streaming)
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = (end - start) + 1;
        
        const file = fs.createReadStream(videoPath, { start, end });
        
        res.writeHead(206, {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': 'video/mp4',
        });
        
        file.pipe(res);
      } else {
        // No range requested, send entire file
        res.writeHead(200, {
          'Content-Length': fileSize,
          'Content-Type': 'video/mp4',
          'Content-Disposition': 'inline; filename="uploaded_video.mp4"'
        });
        
        const videoStream = fs.createReadStream(videoPath);
        videoStream.pipe(res);
        
        videoStream.on('error', (err) => {
          console.error('Error streaming video:', err);
          if (!res.headersSent) {
            res.status(500).send('Error streaming video');
          }
        });
      }
    });
  };