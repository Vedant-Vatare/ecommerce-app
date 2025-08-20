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

export async function createAdmin(req, res) {
  try {
    const { userId } = req.body;
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const admin = await prisma.admin.create({
      data: {
        userId: user.id,
      },
    });

    return res.status(201).json({
      message: 'Admin created successfully.',
      admin,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating admin.', error });
  }
}

export async function createUserAddress(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const userAddress = await prisma.userAddress.create({
      data: {
        userId: user.id,
        ...req.body,
      },
    });

    return res.status(201).json({
      message: 'User address created successfully.',
      userAddress,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error creating user address.', error: error.message });
  }
}

export async function getUserAllAddresses(req, res) {
  try {
    const addresses = await prisma.userAddress.findMany({
      where: { userId: req.userId },
    });

    return res.status(200).json({
      message: 'User addresses fetched successfully.',
      addresses,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error retrieving user addresses.',
      error: error.message,
    });
  }
}

export async function getUserAddressById(req, res) {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: 'Address id is required.' });
    }

    const address = await prisma.userAddress.findUniqueOrThrow({
      where: {
        id: req.params.id,
        userId: req.userId,
      },
    });

    return res.status(200).json({
      message: 'User address fetched successfully.',
      address,
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Address not found.' });
    }

    return res.status(500).json({
      message: 'Error retrieving user address.',
      error: error.message,
    });
  }
}

export async function updateUserAddress(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Address id is required.' });
    }

    const address = await prisma.userAddress.findUnique({
      where: {
        id,
        userId: req.userId,
      },
    });

    if (!address) {
      return res.status(404).json({ message: 'Address not found.' });
    }

    const updatedAddress = await prisma.userAddress.update({
      where: { id },
      data: req.body,
    });

    return res.status(200).json({
      message: 'User address updated successfully.',
      address: updatedAddress,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error updating user address.',
      error: error.message,
    });
  }
}

export async function deleteUserAddress(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Address id is required.' });
    }

    const address = await prisma.userAddress.findUnique({
      where: {
        id,
        userId: req.userId,
      },
    });

    if (!address) {
      return res.status(404).json({ message: 'Address not found.' });
    }

    await prisma.userAddress.delete({
      where: { id },
    });

    return res.status(200).json({
      message: 'User address deleted successfully.',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error deleting user address.',
      error: error.message,
    });
  }
}
