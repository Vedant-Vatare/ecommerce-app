import { z } from 'zod';
import prisma from '../db/db.js';
import { createOrderSchema } from '../schemas/orderSchema.js';

export async function validateCreateOrder(req, res, next) {
  try {
    const zodResponse = createOrderSchema.safeParse(req.body);
    if (!zodResponse.success) {
      return res.status(400).json({
        message: 'invalid order data',
        error: z.treeifyError(zodResponse.error),
      });
    }

    const userOrderProducts = zodResponse.data.orderItems;
    const userOrderProductIds = userOrderProducts.map((item) => item.productId);

    if (new Set(userOrderProductIds).size !== userOrderProducts.length) {
      return res.status(400).json({
        error: 'Duplicate products found in ordered items.',
      });
    }

    const orderProducts = await prisma.product.findMany({
      where: { id: { in: userOrderProductIds } },
    });

    if (orderProducts.length !== userOrderProducts.length) {
      return res.status(400).json({
        error: 'Some products in the order are not available.',
        unavailableProducts: userOrderProductIds.filter(
          (id) => !orderProducts.find((product) => product.id === id),
        ),
      });
    }

    for (const product of orderProducts) {
      const userProduct = userOrderProducts.find(
        (item) => item.productId === product.id,
      );

      if (product.stock < 1) {
        return res.status(400).json({
          error: `Product ${product.id} is out of stock.`,
        });
      }

      if (userProduct.quantity > product.stock) {
        return res.status(400).json({
          error: `Insufficient stock for product ${product.id}.`,
          availableStock: product.stock,
          requestedQuantity: userProduct.quantity,
        });
      }

      // attach ordered quantity for later use
      product.orderedQuantity = userProduct.quantity;
    }

    const totalAmount = orderProducts.reduce((acc, item) => {
      return acc + item.price * item.orderedQuantity;
    }, 0);

    req.orderData = {
      orderItems: orderProducts.map((p) => ({
        id: p.id,
        price: p.price,
        orderedQuantity: p.orderedQuantity,
      })),
      totalAmount,
    };

    next();
  } catch (error) {
    console.error('Order validation error:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
}
