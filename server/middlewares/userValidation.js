import { userSchema } from '../schemas/userSchema.js';
import bcrypt from 'bcryptjs';

export function validateUserSignup(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({
      status: 'error',
      message: 'Email and password are required',
    });
  }

  const { error } = userSchema.safeParse({ email, password });
  if (error) {
    return res.status(401).json({
      status: 'error',
      message: error.issues.map((issue) => issue.message).join(', '),
    });
  }
  next();
}

export async function validateUserLogin(req, res, next) {
  const { email, password } = req.body;

  const { error } = userSchema.safeParse({ email, password });
  if (error) {
    return res.status(401).json({
      success: false,
      status: 'error',
      message: error.issues.map((issue) => issue.message).join(', '),
    });
  }
  next();
}
