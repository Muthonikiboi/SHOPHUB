import express, { NextFunction ,Request ,Response, ErrorRequestHandler } from 'express';
import productRoutes from './Routes/productRoutes';
import authRoutes from './Routes/authRoutes';
import AppError from './Utils/AppError';
import imageRoutes from './Routes/imageRoutes';
import orderRoutes from './Routes/orderRoutes';
import cors from "cors";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

// Product routes
app.use('/api/v1/products', productRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use('/api/images', imageRoutes);

//handling undefined routes
app.use("*", (req:Request, res:Response,next:NextFunction) => {
  return next(new AppError( `This Route ${req.originalUrl} is not defined`,500))
})

interface Error extends ErrorRequestHandler{
  statusCode: number;
  status: string;
  message: string;
}

//Error Middleware
app.use((err:Error,req:Request, res:Response, next:NextFunction) =>{
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";

  res.status(statusCode).json({
    status: status,
    message: err.message
  });
})

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}🎉🎉🎉🎉`);
});
