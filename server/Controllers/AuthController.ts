import { Request, Response, NextFunction } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import AppError from '../Utils/AppError';

dotenv.config();

const prisma = new PrismaClient();

// Register a new user
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  type User={
    email: string;
    password: string;
    passwordConfirm: string;
    role: 'RETAILER' | 'SUPPLIER';
    name: string;
    contactInfo: string;
  }
  const { email, password, passwordConfirm, role, name, contactInfo } = req.body;

   // Validate input fields
   if (!email || !password || !passwordConfirm || !role || !name) {
      return next(new AppError('Please provide all required fields', 400));
   }
   
   if (password !== passwordConfirm) {
      return next(new AppError('Passwords do not match', 400));
   }
   
   if (role !== 'RETAILER' && role !== 'SUPPLIER') {
      return next(new AppError("Invalid role. Choose 'RETAILER' or 'SUPPLIER'", 400));
   }
   

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS) || 10);

    let userData: any = { email, password: hashedPassword, role };

    // Create supplier or retailer data depending on the role
    if (role === 'SUPPLIER') {
      const supplier = await prisma.supplier.create({
        data: { name, contactInfo },
      });
      userData = { ...userData, supplierId: supplier.id };
    } else if (role === 'RETAILER') {
      const retailer = await prisma.retailer.create({
        data: { name, contactInfo },
      });
      userData = { ...userData, retailerId: retailer.id };
    }

    // Create the user with associated data
    const newUser = await prisma.user.create({
      data: userData as Prisma.UserCreateInput,
    });

    console.log(newUser)

    // Generate a JWT token
    const token = jwt.sign(
      { id: newUser.id, role: newUser.role },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRY || '10d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      newUser,
    });
  } catch (error) {
   console.log(error);
   return next(new AppError('Error creating user', 500));
  }
};

// Get all users
export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
   try {
     // Fetch all users from the database
     const users = await prisma.user.findMany({
       include: {
         supplier: true, 
         retailer: true, 
       },
     });
 
     res.status(200).json({
       message: 'Users retrieved successfully',
       data: users,
     });
   } catch (error) {
     console.error(error);
     return next(new AppError('Error retrieving users', 500));
   }
};