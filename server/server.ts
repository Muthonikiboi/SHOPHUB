import express from 'express';
import productRoutes from './Routes/productRoutes';
import authRoutes from './Routes/authRoutes';

const app = express();
app.use(express.json());

// Product routes
app.use('/api/v1/products', productRoutes);
app.use("/api/v1/auth", authRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}🎉🎉🎉🎉`);
});
