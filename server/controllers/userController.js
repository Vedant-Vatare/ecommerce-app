import prisma from '../db/db.js';
import { hash, compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
export async function createUser(req, res) {
  try {
    const hashedPassword = await hash(req.body.password, 10);
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
      },
    });
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
    );
    return res.status(201).json({
      success: true,
      data: { user, token },
      message: 'User created successfully',
    });
  } catch (error) {
    if (error.code === 'P2002') {
      return res
        .status(401)
        .json({ success: false, message: 'user with email already exists' });
    }
    return res
      .status(500)
      .json({ success: false, message: 'Internal Server Error' });
  }
}

export async function LoginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid email or password' });
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid email or password' });
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
    );

    return res.status(200).json({
      success: true,
      data: { id: user.id, email: user.email, token },
      message: 'Login successful',
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Internal Server Error' });
  }
}
