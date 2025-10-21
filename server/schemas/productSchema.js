import { z } from 'zod';

const productSchema = z.object({
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

  category: z.string().optional(),
});

export const productCreateSchema = productSchema;
export const updateProductSchema = productSchema.partial();

export const productCollectionSchema = z.object({
  categoryId: z.string({ required_error: 'Category ID is required.' }),
  productId: z.string({ required_error: 'Product ID is required.' }),
}).strict();

export const updateProductCollectionSchema = productCollectionSchema.partial();
