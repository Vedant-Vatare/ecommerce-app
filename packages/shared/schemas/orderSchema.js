import { z } from 'zod';

export const createOrderSchema = z.object({
  orderItems: z.array(
    z.object({
      productId: z.uuid(),
      quantity: z
        .number({ error: 'Invalid quantity' })
        .min(1, { error: 'Minimum order quantity is 1 item.' })
        .max(20, { error: 'Maximum order limit is 20 items.' }),
    }),
  ),
});
