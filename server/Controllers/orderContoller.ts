import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import AppError from '../Utils/AppError';

const prisma = new PrismaClient();

// Get all Orders
export const getAllOrders = async (req: Request, res: Response, next: NextFunction)=> {
  try {
    const orders = await prisma.order.findMany();
    res.json(orders);
  } catch (error) {
    return next(new AppError("Error fetching orders" ,500))
  }
};

// Get order by ID
export const getOrderById = async (req: Request, res: Response, next: NextFunction)=> {
  const { id } = req.params;
  try {
    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) },
    });
    if (!order) {
      return next(new AppError("Order not found" ,500))
    }
    res.json(order);
  } catch (error) {
    return next(new AppError("Error fetching order",500 ))
  }
};

// Create a new order
export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  const { retailerId, items, expectedDate } = req.body;
  try {
    const productIds = items.map((item: { productId: any }) => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      include: { supplier: true },
    });
    const newOrder = await prisma.order.create({
      data: {
        retailer: { connect: { id: retailerId } },
        status: 'PENDING',
        expectedDate: new Date(expectedDate),
        items: {
          create: items.map((item: { productId: any; quantity: any; }) => ({
            product: { connect: { id: item.productId } },
            quantity: item.quantity,
          })),
        },
      },
    });
    res.status(201).json(newOrder);
  } catch (error) {
    console.log(error);
    return next(new AppError("Error creating order",500))
  }
};

//cancel order
export const cancelOrder = async (req:Request, res:Response ,next:NextFunction)=>{
   const {id}=req.params;
   try{
      await prisma.order.update({
         where:{id:parseInt(id)},
         data:{status:'CANCELED'}
      });
      res.status(200).json({message:"Order cancelled successfully"});
   }catch(err){
      console.log(err);
      return next(new AppError("Error cancelling order",500));
   }
}