import Router from 'express';
import upload from '../utils/multerConfig.js';
import {
  validateCreateProduct,
  validateUpdateProduct,
} from '../middlewares/productValidation.js';
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProductsBySearch,
  updateProduct,
} from '../controllers/productController.js';
import asyncHandler from '../utils/asyncHandler.js';
import { authenticateAdmin } from '../middlewares/authUser.js';

const router = Router();
router.post(
  '/',
  authenticateAdmin,
  upload.array('images'),
  validateCreateProduct,
  asyncHandler(createProduct),
);

router.get('/:id', asyncHandler(getProductById));
router.get('/bulk/:search', asyncHandler(getProductsBySearch));
router.patch(
  '/:id',
  authenticateAdmin,
  upload.array('images'),
  validateUpdateProduct,
  asyncHandler(updateProduct),
);
router.delete('/:id', authenticateAdmin, asyncHandler(deleteProduct));

export default router;
