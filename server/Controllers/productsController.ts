import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import AppError from '../Utils/AppError';
import { decodeTokenId, simulateToken } from "../Utils/decodeToken";

const prisma = new PrismaClient();

// Get all products
export const getAllProducts = async (req: Request, res: Response ,next:NextFunction)=> {
  try {
    const products = await prisma.product.findMany({
      include:{
        supplier: true,
      }
    });
    res.json(products);
  } catch (error) {
    return next(new AppError("Error fetching products" ,500))
  }
};

// Get product by ID
export const getProductById = async (req: Request, res: Response ,next:NextFunction)=> {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include:{
        supplier: true,
      }
    });
    if (!product) {
      return next(new AppError("Product not found" ,500))
    }
    res.json(product);
  } catch (error) {
    return next(new AppError("Error fetching product",500 ))
  }
};

// Create a new product
export const createProduct = async (req: any, res: Response, next: NextFunction) => {
  // Step 1: Simulate token verification and get the token
  const token = await simulateToken(req, res, next);

  if (!token) {
    return next(new AppError("Token not verified", 401));
  }

  // Step 2: Decode the token to get the user ID
  const userId = decodeTokenId(token);

  // Step 3: Fetch the user and include their associated supplier
  const user:any = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      supplier: {
        select: {
          id: true, // We only need the supplier ID
        }
      },
    },
  });

  // Step 4: Extract the supplierId from the user object
  const supplierId:any= user.supplier.id;
  console.log(supplierId);

  // Step 5: If no supplierId, return an error
  if (!supplierId) {
    return next(new AppError("Supplier not found", 404));
  }

  // Step 6: Extract product details from the request body
  const { name, description, price, stockLevel } = req.body;

  // Step 7: Create the new product
  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        supplierId, // Correctly use the supplierId from the supplier relation
        stockLevel,
      },
    });

    // Step 8: Return the newly created product
    console.log(newProduct);

    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    return next(new AppError("Error creating product", 500));
  }
};

// Update a product
export const updateProduct = async (req: Request, res: Response ,next:NextFunction)=> {
  const { id } = req.params;
  const { name, description, price, stockLevel } = req.body;
  try {
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: { name, description, price, stockLevel },
    });
    res.json(updatedProduct);
  } catch (error) {
    console.log(error);
    return next(new AppError("Error updating product", 500))
  }
};

// Delete a product
export const deleteProduct = async (req: Request, res: Response ,next:NextFunction) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({ 
      where: { id: parseInt(id) },
    });
    res.status(204).end();
  } catch (error) {
    return next(new AppError("Error deleting product", 500))
  }
};

// Get products by Supplier ID
export const getProductsBySupplierId = async (req: Request, res: Response ,next:NextFunction)=> {
  const { supplierId } = req.params;
  try {
    const products = await prisma.product.findMany({
      where: { supplierId: parseInt(supplierId) },
    });
    res.json(products);
  } catch (error) {
    return next(new AppError("Error fetching products for supplier", 500))
  }
};
