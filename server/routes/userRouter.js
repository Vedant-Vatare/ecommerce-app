import { Router } from 'express';
import {
  createUser,
  createUserAddress,
  deleteUserAddress,
  getUserAddressById,
  getUserAllAddresses,
  LoginUser,
  updateUserAddress,
} from '../controllers/userController.js';
import {
  validateCreateAddress,
  validateUpdateAddress,
  validateUserLogin,
  validateUserSignup,
} from '../middlewares/userValidation.js';
import asyncHandler from '../utils/asyncHandler.js';
import { authenticateUser } from '../middlewares/authUser.js';

const router = Router();
router.post('/signup', validateUserSignup, asyncHandler(createUser));
router.post('/login', validateUserLogin, asyncHandler(LoginUser));
router.post(
  '/address',
  authenticateUser,
  validateCreateAddress,
  asyncHandler(createUserAddress),
);
router.get('/address/all', authenticateUser, asyncHandler(getUserAllAddresses));
router.get('/address/:id', authenticateUser, asyncHandler(getUserAddressById));
router.patch(
  '/address/:id',
  authenticateUser,
  validateUpdateAddress,
  asyncHandler(updateUserAddress),
);
router.delete(
  '/address/:id',
  authenticateUser,
  asyncHandler(deleteUserAddress),
);

export default router;
