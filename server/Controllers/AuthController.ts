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
         supplier: true, // Include supplier data if needed
         retailer: true,  // Include retailer data if needed
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

























// import { Request, Response } from 'express';
// import { Prisma, PrismaClient } from '@prisma/client';
// import bcrypt from "bcrypt";

// const prisma = new PrismaClient();

// type UserData = {
//   email: string;
//   password: string;
//   role: string;
//   supplierId?: number;  // Optional, only for suppliers
//   retailerId?: number;  // Optional, only for retailers
// };

// // Register a new user
// export const register = async (req: Request, res: Response): Promise<void> => {
//   const { email, password, role, name, contactInfo } = req.body;

//   if (!email || !password || !role || !name) {
//     res.status(400).json({ error: "Please provide all required fields" });
//     return;
//   }

//   if (role !== "RETAILER" && role !== "SUPPLIER") {
//     res.status(400).json({ error: "Invalid role. Choose 'RETAILER' or 'SUPPLIER'" });
//     return;
//   }

//   try {
//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     let userData: any = { email, password: hashedPassword, role };

//     // If the role is SUPPLIER, add supplierId to userData
//     if (role === "SUPPLIER") {
//       const supplier = await prisma.supplier.create({
//         data: { name, contactInfo },
//       });
//       userData = { ...userData, supplierId: supplier.id };
//     }
//     // If the role is RETAILER, add retailerId to userData
//     else if (role === "RETAILER") {
//       const retailer = await prisma.retailer.create({
//         data: { name, contactInfo },
//       });
//       userData = { ...userData, retailerId: retailer.id };
//     }
    
//     const newUser = await prisma.user.create({
//       data: userData as Prisma.UserCreateInput, // Cast userData to Prisma.UserCreateInput type
//     });
    

//     res.status(201).json({ message: "User registered successfully", newUser });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error creating user" });
//   }
// };
