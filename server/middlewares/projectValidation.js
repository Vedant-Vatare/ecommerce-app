import { productSchema } from '../schemas/productSchema.js';

export async function validateCreateProduct(req, res, next) {
  const zodResult = productSchema.safeParse(req.body);

  if (!zodResult.success) {
    return res.status(400).json({
      message: 'Invalid product data.',
      error: zodResult.error.issues,
    });
  }
  req.validatedBody = zodResult.data;

  next();
}
