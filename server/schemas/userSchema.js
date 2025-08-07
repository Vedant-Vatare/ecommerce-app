import { z } from 'zod';

export const userSchema = z.object({
  email: z.email({ message: 'Invalid email format' }),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});
