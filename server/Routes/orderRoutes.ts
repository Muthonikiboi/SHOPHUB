import express from 'express';
import {
   getAllOrders,
   getOrderById,
   createOrder,
   cancelOrder,
} from '../Controllers/orderContoller';
import { protect, restrictAccess } from '../Controllers/AuthController';

const router = express.Router();

router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.post('/create', createOrder);
router.patch('/:id', cancelOrder);

export default router;
