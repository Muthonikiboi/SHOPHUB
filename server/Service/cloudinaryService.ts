import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

class CloudinaryService {
  async uploadImage(buffer: Buffer, publicId?: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { public_id: publicId, folder: 'profile-pictures' },
        (error, result) => {
          if (error) {
            reject(error);
          } else if (result) {
            resolve(result.secure_url);
          }
        }
      );

      uploadStream.end(buffer);
    });
  }

  getOptimizedImageUrl(publicId: string): string {
    return cloudinary.url(publicId, {
      fetch_format: 'auto',
      quality: 'auto',
    });
  }

  getTransformedImageUrl(publicId: string): string {
    return cloudinary.url(publicId, {
      crop: 'auto',
      gravity: 'auto',
      width: 500,
      height: 500,
    });
  }
}

export default new CloudinaryService();
