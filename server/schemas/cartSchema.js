import z from 'zod';

export const cartItemSchema = z.object({
  cartItemId: z.uuid(),
  quantity: z
    .number({ message: 'Invalid quantity of product' })
    .min(1, { message: 'Quantity must be at least 1' }),
});

export const modifyCartSchema = cartItemSchema.pick({
  cartItemId: true,
  quantity: true,
});
