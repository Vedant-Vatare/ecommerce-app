import { nanoid } from 'nanoid';
import prisma from '../db/db.js';
import razorpay from '../utils/razorpay.js';

export async function getOrder(req, res) {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.userId },
      include: { orderItems: { include: { product: true } } },
    });
    res.status(200).json({ message: 'order details fetched', orders });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'failed to fetch order details', error: error.message });
  }
}

export async function createOrder(req, res) {
  try {
    const razorpayOptions = {
      amount: Math.round(req.orderData.totalAmount * 100),
      currency: 'INR',
      receipt: `order_${nanoid()}`,
      notes: {
        userId: req.userId,
      },
    };

    const razorpayOrder = await razorpay.orders.create(razorpayOptions);

    const order = await prisma.order.create({
      data: {
        userId: req.userId,
        orderItems: {
          create: req.orderData.orderItems.map((item) => ({
            productId: item.id,
            quantity: item.orderedQuantity,
            amount: item.price * item.orderedQuantity,
          })),
        },
        totalAmount: req.orderData.totalAmount,
        transactionId: razorpayOrder.id,
        paymentStatus: 'pending',
        orderStatus: 'pending',
        shippingAddressId: req.body.shippingAddressId,
      },
    });

    return res.status(201).json({
      message: 'order created successfully',
      order,
      razorpay: {
        orderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        keyId: process.env.RAZORPAY_KEY_ID,
        receipt: razorpayOrder.receipt,
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: 'failed to create order', error: error.message });
  }
}
