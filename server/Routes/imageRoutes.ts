// src/routes/imageRoutes.ts
import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import cloudinaryService from '../Service/cloudinaryService';
import AppError from '../Utils/AppError';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); 

router.post('/upload/profile/:userId', upload.single('image'), async (req: Request, res: Response, next: NextFunction) :Promise <void>=> {
  const { userId } = req.params;

  try {
    if (!req.file) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }
    const url = await cloudinaryService.uploadUserImage(parseInt(userId), req.file.buffer);
    res.status(200).json({ message: 'Profile image uploaded successfully', url });
  } catch (error) {
    console.error('Error uploading profile image:', error);
    return next(new AppError('Error uploading profile image', 500));
  }
});

export default router;
