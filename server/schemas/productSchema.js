import { z } from 'zod';

export const productSchema = z
  .object({
    name: z
      .string({ required_error: 'Name of product is required.' })
      .min(2, 'Name must be at least 2 characters.')
      .max(100, 'Name must be under 100 characters.')
      .transform((val) => val.trim()),
    description: z
      .string()
      .max(1000, 'Description must be under 1000 characters.')
      .optional()
      .transform((val) => (val ? val.trim() : val)),
    price: z.coerce.number().min(1, 'Price is required.'),

    stock: z.coerce
      .number()
      .min(0, 'Stock must be a valid non-negative number')
      .default(0),

    category: z
      .string()
      .optional()
      .transform((val) => (val ? val.trim() : val)),
  })
  .transform((data) => ({
    ...data,
    price: Number(data.price),
    stock: Number(data.stock),
  }));
