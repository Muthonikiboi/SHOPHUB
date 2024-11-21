import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { decodeTokenId, simulateToken } from "../Utils/decodeToken";
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
export const createOrder = async (req: any, res: Response, next: NextFunction) => {
  // Step 1: Simulate token verification and get the token
  const token = await simulateToken(req, res, next);

  if (!token) {
    return next(new AppError("Token not verified", 401));
  }

  // Step 2: Decode the token to get the user ID
  const userId = decodeTokenId(token);

  // Step 3: Fetch the user and include their associated retailer
  const user: any = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      retailer: {
        select: {
          id: true, // We only need the retailer ID
        },
      },
    },
  });

  // Step 4: Extract the retailerId from the user object
  const retailerId: any = user.retailer?.id;
  console.log(retailerId);

  // Step 5: If no retailerId, return an error
  if (!retailerId) {
    return next(new AppError("Retailer not found", 404));
  }

  // Step 6: Extract order details from the request body
  const { items, expectedDate } = req.body;

  // Step 7: Create the new order
  try {
    const newOrder = await prisma.order.create({
      data: {
        retailer: { connect: { id: retailerId } }, // Connect to the retailer using their ID
        status: "PENDING",
        expectedDate: expectedDate ? new Date(expectedDate) : null,
        items: {
          create: items.map((item: { productId: number; quantity: number }) => ({
            product: { connect: { id: item.productId } },
            quantity: item.quantity,
          })),
        },
      },
    });

    // Step 8: Return the newly created order
    console.log(newOrder);

    res.status(201).json(newOrder);
  } catch (error) {
    console.log(error);
    return next(new AppError("Error creating order", 500));
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