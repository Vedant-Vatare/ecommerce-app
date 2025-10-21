import { Router } from 'express';
import userRouter from './userRouter.js';
import productRouter from './productRouter.js';
import cartRouter from './cartRouter.js';
import orderRouter from './orderRouter.js';
import CategoryRouter from './categoryRouter.js';

const router = Router();
router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/category', CategoryRouter);
router.use('/cart', cartRouter);
router.use('/order', orderRouter);

export default router;
