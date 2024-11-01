import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsBySupplierId,
  resetProducts,
} from '../Controllers/productsController';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/create', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.get('/supplier/:supplierId', getProductsBySupplierId);

router.post("/reset-products",resetProducts)

export default router;
