import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all products
export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
};

// Get product by ID
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });
    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error fetching product" });
  }
};

// Create a new product
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  const { name, description, price, supplierId, stockLevel } = req.body;
  try {
    const newProduct = await prisma.product.create({
      data: { name, description, price, supplierId, stockLevel },
    });
    res.status(201).json(newProduct);
  } catch (error) {
   console.log(error)
    res.status(500).json({ error: "Error creating product" });
  }
};

// Update a product
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, description, price, stockLevel } = req.body;
  try {
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: { name, description, price, stockLevel },
    });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Error updating product" });
  }
};

// Delete a product
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await prisma.product.delete({ where: { id: parseInt(id) } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Error deleting product" });
  }
};

// Get products by Supplier ID
export const getProductsBySupplierId = async (req: Request, res: Response): Promise<void> => {
  const { supplierId } = req.params;
  try {
    const products = await prisma.product.findMany({
      where: { supplierId: parseInt(supplierId) },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products for supplier" });
  }
};

export const resetProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    // Delete related OrderItems first
    await prisma.orderItem.deleteMany({});
    
    // Delete related SupplierProducts if applicable
    // Uncomment the line below if you need to clear the SupplierProducts relation table
    // await prisma.supplierProducts.deleteMany({}); 

    // Delete all existing products
    await prisma.product.deleteMany({});

    // Reset the sequence for Product IDs
    await prisma.$executeRaw`ALTER SEQUENCE "Product_id_seq" RESTART WITH 1;`;

    res.status(200).json({ message: "Products reset successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error resetting products" });
  }
};
