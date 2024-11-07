import { Request, Response, NextFunction } from 'express';
import { Prisma, PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import AppError from '../Utils/AppError';
import { generateToken } from '../Models/resetToken';
import { sendMail } from '../Utils/email';
import crypto, { createHash } from 'crypto';


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

// Admin registration endpoint (not exposed to frontend)
export const registerAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password, name, contactInfo } = req.body;

  // Validate input fields
  if (!email || !password || !name) {
    return next(new AppError('Please provide all required fields', 400));
  }

  // Password validation can be added here
  if (password.length < 6) {
    return next(new AppError('Password must be at least 6 characters long', 400));
  }

  try {
    const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS) || 10);

    // Create the admin user in the User model
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: 'ADMIN', 
      }
    });

    // Create the associated admin record
    const newAdmin = await prisma.admin.create({
      data: {
        name,
        email,
        contactInfo,
        User: { connect: { id: newUser.id } } 
      }
    });

    // Generate a JWT token for the admin user
    const token = jwt.sign(
      { id: newUser.id, role: newUser.role },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRY || '10d' }
    );

    res.status(201).json({
      message: 'Admin registered successfully',
      token,
      newAdmin,
    });
  } catch (error) {
    console.log(error);
    return next(new AppError('Error creating admin user', 500));
  }
};



// Login a user
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body;

  if (!email ||!password) {
    return next(new AppError('Please provide both email and password', 400));
  }

  try{
    const user= await prisma.user.findUnique({
      where: { email },
      include:{
        retailer:true,
        supplier:true
      }
    })

    if (!user) {
      return next(new AppError('Invalid credentials', 401));
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return next(new AppError('Invalid credentials', 401));
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRY || '10d' }
    );

    res.status(200).json({
      message: 'User logged in successfully',
      token,
      user,
    })
  }catch(err){
    return next(new AppError('User not found', 401));
  }

}

export const protect = async ( req:any , res:Response ,next:NextFunction): Promise<void> =>{
  try{
    //Get Token
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
      token = req.headers.authorization.split(" ")[1];
    }

    if(!token){
      return next(new AppError("Token Not Available", 401));
    }

    //If there is Token
    const decodeToken = jwt.verify(token , process.env.JWT_SECRET!) as {
      id:any
    }
    console.log(decodeToken);

    const currentUser = await prisma.user.findUnique({
      where:{
        id:decodeToken.id
      }
    })

    if(!currentUser){
      return next(new AppError("User not found",401))
    }

    //if user is Available
    req.user = currentUser;

  }catch(err){

  }
}

//Restrict access (authorization)
export const restrictAccess = (...roles: string[]): any => {
  return (req: any, res: Response, next: NextFunction)=> {
    if(!roles.includes(req.user.role)){
      return next(new AppError('Unauthorized access', 403));
    }
    next();
  };
};

//Forget Password
export const forgotPassword=async (req: Request, res: Response ,next:NextFunction): Promise<void>  => {
  const { email} = req.body;
  try{
    const user= await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return next(new AppError('Invalid credentials', 401));
    }

    const {token, passwordResetToken,passwordResetExpires}=generateToken();

    await prisma.user.update({
      where: { id: user.id },
      data: { 
        passwordResetToken:passwordResetToken, 
        passwordResetExpires:new Date(passwordResetExpires) 
      }
    })

    const resetUrl=`${req.originalUrl}`;

    // const message= `Forgot Your Password? \n Submit request with your password to ${resetUrl} \n if you didn't forget your password please ignore this email.`

    await sendMail({
      email: user.email,
      subject: 'Password Reset Token (valid for 10 minutes)',
      text: `You are receiving this email because you have requested a password reset. Please copy the token to reset your password: \n\nhttp://localhost:3000/resetPassword/${token}\n\n This link will expire in 10 minutes.`
    });

    res.status(200).json({
      status:'success',
      message:'Token sent to your email!'
    })

  }catch(err){
    console.log(err);

    return next(new AppError('Error sending email',500))
  }
}

export const resetPassword= async(req: Request, res: Response ,next:NextFunction):Promise<void>=> {
  //Get User Based on the token
  const hashedToken =crypto.createHash("sha256").update(req.params.token).digest('hex');

  const user= await prisma.user.findFirst({
    where: {
      passwordResetToken: hashedToken,
      passwordResetExpires: {
        gte: new Date(),
      },
    },
  })
  
  if(!user){
    return next(new AppError('Invalid or expired token', 400));
  }

  const {password}=req.body as {
    password:string;
  }

  if(!password){
    return next(new AppError('Password Required', 400));
  }

  const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS) || 10);

  user.password =req.body.password;
  user.passwordResetToken = null;
  user.passwordResetExpires = null;

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password:hashedPassword,
      passwordResetToken:null,
      passwordResetExpires:null
    },
  });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: process.env.JWT_EXPIRY || '10d' }
  );

  res.status(200).json({
    status:'success',
    message:'Password reset successful!',
    // token:hashedToken
  })


}

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

//Update User
export const updateRetailer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  const { id } = req.params;
  const { name, contactInfo } = req.body as {
    name: string;
    contactInfo: string;
  };

  if (!name &&!contactInfo) {
    return next(new AppError('No fields to update', 400));
  }

  try {
    const updatedRetailer = await prisma.retailer.update({
      where: { id: parseInt(id) },
      data: { 
        name, 
        contactInfo 
      },
    })
    res.json(updatedRetailer);
  } catch (error) {
    console.log(error);
    return next(new AppError('Error updating users', 500));
  }
}

//Update Supplier
export const updateSupplier =async(req: Request, res: Response ,next:NextFunction) =>{
  const { id } = req.params;
  const { name, contactInfo } = req.body as {
    name: string;
    contactInfo: string;
  };

  if (!name &&!contactInfo) {
    return next(new AppError('No fields to update', 400));
  }

  try {
    const updatedSupplier = await prisma.supplier.update({
      where: { id: parseInt(id) },
      data: { 
        name, 
        contactInfo 
      },
    })
    res.json(updatedSupplier);
  } catch (error) {
    console.log(error);
    return next(new AppError('Error updating users', 500));
  }
}

//getUsersById
export const getUsersById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: {
        supplier: true,
        retailer: true,
      },
    });

    if (!user) {
      return next(new AppError('User not found', 404));
    }

    res.json({
      message: 'User retrieved successfully',
      data: user,
    });
  } catch (error) {
    console.error(error);
    return next(new AppError('Error retrieving user', 500));
  }
};

//delete user buy Id
export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedUser = await prisma.user.delete({
      where: { id: parseInt(id) },
    });

    if (!deletedUser) {
      return next(new AppError('User not found', 404));
    }

    res.json({
      message: 'User deleted successfully',
      data: deletedUser,
    });
  } catch (error) {
    console.log(error);
    return next(new AppError('Error deleting user', 500));
  }
};