import { Router } from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import { authenticateAdmin } from '../middlewares/authUser.js';
import {
  validateCreateCategory,
  validateUpdateCategory,
} from '../middlewares/categoryValidation.js';
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from '../controllers/categoryController.js';

const router = Router();

router.post(
  '/create',
  authenticateAdmin,
  validateCreateCategory,
  asyncHandler(createCategory),
);
router.get('/all', asyncHandler(getAllCategories));
router.patch('/:id', validateUpdateCategory, asyncHandler(updateCategory));
router.delete('/:id', authenticateAdmin, asyncHandler(deleteCategory));

export default router;
