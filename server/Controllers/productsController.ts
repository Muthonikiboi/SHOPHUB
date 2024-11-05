import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import AppError from '../Utils/AppError';

const prisma = new PrismaClient();

// Get all products
export const getAllProducts = async (req: Request, res: Response ,next:NextFunction)=> {
  try {
    const products = await prisma.product.findMany();
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
export const createProduct = async (req: Request, res: Response ,next:NextFunction)=> {
  const { name, description, price, supplierId, stockLevel } = req.body;
  try {
    const newProduct = await prisma.product.create({
      data: { name, description, price, supplierId, stockLevel },
    });
    res.status(201).json(newProduct);
  } catch (error) {
   console.log(error)
    return next(new AppError("Error creating product" ,500))
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
