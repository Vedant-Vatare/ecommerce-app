import { Router } from 'express';
import { createUser, LoginUser } from '../controllers/userController.js';
import {
  validateUserLogin,
  validateUserSignup,
} from '../middlewares/userValidation.js';

const router = Router();
router.post('/signup', validateUserSignup, createUser);
router.post('/login', validateUserLogin, LoginUser);

export default router;
