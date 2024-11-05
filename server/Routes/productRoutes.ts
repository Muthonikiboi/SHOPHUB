import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsBySupplierId
} from '../Controllers/productsController';
import { protect, restrictAccess } from '../Controllers/AuthController';

const router = express.Router();

router.get('/',protect, restrictAccess('ADMIN'), getAllProducts);
router.get('/:id', getProductById);
router.post('/create', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.get('/supplier/:supplierId', getProductsBySupplierId);

export default router;
