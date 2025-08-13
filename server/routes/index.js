import { Router } from 'express';
import userRouter from './userRoute.js';
import productRouter from './product.js';
import cartRouter from './cartRouter.js';

const router = Router();
router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/cart', cartRouter);

export default router;
