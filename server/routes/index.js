import { Router } from 'express';
const router = Router();
import userRouter from './userRoute.js';

router.use('/user', userRouter);

export default router;
