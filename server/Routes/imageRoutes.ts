// src/routes/imageRoutes.ts
import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import cloudinaryService from '../Service/cloudinaryService';
import AppError from '../Utils/AppError';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // Using memory storage

router.post('/upload', upload.single('image'), async (req: Request, res: Response ,next:NextFunction): Promise<void> => {
   try {
     if (!req.file) {
       res.status(400).json({ message: 'No file uploaded' });
       return;
     }
 
     const url = await cloudinaryService.uploadImage(req.file.buffer, 'uploaded_image');
     res.status(200).json({ message: 'Image uploaded successfully', url });
   } catch (error) {
     console.log('Error uploading image:', error);
     return next(new AppError("Error uploading image:", 500))
   }
 });
 
router.get('/optimize/:publicId', (req: Request, res: Response) => {
  const { publicId } = req.params;
  const optimizedUrl = cloudinaryService.getOptimizedImageUrl(publicId);
  res.status(200).json({ optimizedUrl });
});

router.get('/transform/:publicId', (req: Request, res: Response) => {
  const { publicId } = req.params;
  const transformedUrl = cloudinaryService.getTransformedImageUrl(publicId);
  res.status(200).json({ transformedUrl });
});

export default router;
