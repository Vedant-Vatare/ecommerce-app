import Router from 'express';
import upload from '../utils/multerConfig.js';
import { validateCreateProduct } from '../middlewares/projectValidation.js';
import {
  createProduct,
  getProductById,
} from '../controllers/productController.js';
import asyncHandler from '../utils/asyncHandler.js';

const router = Router();
router.post(
  '/',
  upload.array('images'),
  validateCreateProduct,
  asyncHandler(createProduct),
);

router.get('/:id', asyncHandler(getProductById));
export default router;
