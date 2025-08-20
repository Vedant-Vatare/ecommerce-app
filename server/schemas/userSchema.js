import { z } from 'zod';

export const userSchema = z.object({
  email: z.email({ message: 'Invalid email format' }),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export const userAddressSchema = z.object({
  phone: z
    .string()
    .length(10, { message: 'Phone number must be 10 digits long' }),
  address: z
    .string()
    .min(5)
    .max(120, { message: 'Address must be 5 to 120 characters long' }),
  city: z
    .string()
    .min(2)
    .max(70, { message: 'City must be 2 to 70 characters long' }),
  pincode: z
    .string()
    .min(6, { message: 'Pincode must be 6 characters long' })
    .max(6, { message: 'Pincode must be 6 characters long' }),
  state: z
    .string()
    .min(2)
    .max(70, { message: 'State must be 2 to 70 characters long' }),
  country: z.string().min(2).max(50).default('India'),
});

export const updateUserAddressSchema = userAddressSchema.partial();
