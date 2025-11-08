import { modifyCartSchema } from 'shared/schemas/cartSchema.js';

export async function validateUpdateCart(req, res, next) {
  const zodResult = modifyCartSchema.safeParse(req.body);
  if (!zodResult.success) {
    return res.status(400).json({
      message: 'Invalid cart data',
      error: zodResult.error,
    });
  }
  next();
}
