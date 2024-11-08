import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const prisma = new PrismaClient();

class CloudinaryService {
  async deleteImage(publicId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      cloudinary.api.delete_resources([publicId], { type: 'upload', resource_type: 'image' }, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  async uploadUserImage(userId: number, buffer: Buffer): Promise<string> {
    try {
      // Find the user's existing image ID if it exists
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { profileImagePublicId: true }, // Assuming 'profileImageId' stores the Cloudinary public ID
      });

      // Delete the existing profile image on Cloudinary if it exists
      if (user?.profileImagePublicId) {
        await this.deleteImage(user.profileImagePublicId);
      }

      // Upload the new image
      const uploadStream = new Promise<string>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'profile-pictures' },
          async (error, result) => {
            if (error) {
              reject(error);
            } else if (result) {
              // Update the user's profile image ID in the database
              await prisma.user.update({
                where: { id: userId },
                data: { profileImagePublicId: result.public_id }, // Save the new image's public ID
              });
              resolve(result.secure_url);
            }
          }
        ).end(buffer);
      });

      return uploadStream;
    } catch (error) {
      console.error("Error uploading user image:", error);
      throw new Error("Could not upload image.");
    }
  }
}

export default new CloudinaryService();
