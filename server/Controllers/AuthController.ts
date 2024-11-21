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

interface RegisterUser {
  email: string;
  password: string;
  passwordConfirm: string;
  role: Role;
  name: string;
  contactInfo: string;
  phoneNumber: string;
}

export const register = async (
  req: Request<{}, {}, RegisterUser>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password, passwordConfirm, role, name, contactInfo, phoneNumber } = req.body;

  // Validate input fields
  if (!email || !password || !passwordConfirm || !role || !name || !phoneNumber) {
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
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS) || 10
    );

    // Create user with nested creation of supplier or retailer
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
        active: true,
        ...(role === 'SUPPLIER'
          ? {
              supplier: {
                create: {
                  name,
                  contactInfo,
                  phoneNumber,
                },
              },
            }
          : {
              retailer: {
                create: {
                  name,
                  contactInfo,
                  phoneNumber,
                },
              },
            }),
      },
      include: {
        supplier: true,
        retailer: true,
      },
    });

    // Generate a JWT token
    const token = jwt.sign(
      { id: newUser.id, role: newUser.role },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRY || '10d' }
    );

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      token,
      data: {
        user: userWithoutPassword,
      },
    });
  } catch (error) {
    // Check for unique constraint violation
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return next(new AppError('Email already exists', 400));
      }
    }
    
    console.error('Registration error:', error);
    return next(new AppError('Error creating user', 500));
  }
};

interface RegisterAdmin {
  email: string;
  password: string;
  name: string;
  contactInfo?: string;
}

export const registerAdmin = async (
  req: Request<{}, {}, RegisterAdmin>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password, name, contactInfo } = req.body;

  // Validate input fields
  if (!email || !password || !name) {
    return next(new AppError('Please provide all required fields', 400));
  }

  // Password validation
  if (password.length < 6) {
    return next(new AppError('Password must be at least 6 characters long', 400));
  }

  try {
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS) || 10
    );

    // Create user with nested creation of admin
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: 'ADMIN',
        active: true,
        admin: {
          create: {
            name,
            contactInfo,
          },
        },
      },
      include: {
        admin: true,
      },
    });

    // Generate a JWT token
    const token = jwt.sign(
      { id: newUser.id, role: newUser.role },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRY || '10d' }
    );

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json({
      status: 'success',
      message: 'Admin registered successfully',
      token,
      data: {
        user: userWithoutPassword,
      },
    });
  } catch (error) {
    // Check for unique constraint violation
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return next(new AppError('Email already exists', 400));
      }
    }

    console.error('Admin registration error:', error);
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

    //soft Delete User
    if(!user.active){
      return next(new AppError('This Account Does not Exist', 401));
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
        supplier:  {
          include: {
            products: {
              include:{
                orderItems:true
              }
            },  
          }},
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

//Soft Delete
export const softDeleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: {
        supplier: true,
        retailer: true,
      },
    })

    if (!user) {
      return next(new AppError('User not found', 404));
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { active: false },
    });

    res.json({
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.log(error);
    return next(new AppError('Error soft deleting user', 500));
  }
};

//delete user by Id
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