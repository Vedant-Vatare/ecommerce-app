import Router from 'express';
import { authenticateUser } from '../middlewares/authUser.js';
import { createOrder, getOrder } from '../controllers/orderController.js';
import asyncHandler from '../utils/asyncHandler.js';
import { validateCreateOrder } from '../middlewares/orderValidation.js';

const router = Router();

router.use(authenticateUser);
router.get('/', asyncHandler(getOrder));
router.post('/', validateCreateOrder, asyncHandler(createOrder));

export default router;
