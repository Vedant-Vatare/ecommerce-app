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
    const totalAddresses = await prisma.userAddress.count({
      where: { userId: req.userId },
    });
    if(totalAddresses >= 3) {
      return res.status(400).json({ message: 'Address limit reached. You can only add up to 3 addresses.' });
    }
    
    const userAddress = await prisma.userAddress.create({
      data: {
        userId: req.userId,
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
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'Address id is required.' });
  }

  const updatedAddress = await prisma.userAddress.update({
    where: { id },
    data: req.body,
  });

  // removing other default address
  if (req.body.isDefault) {
    await prisma.userAddress.updateMany({
      where: {
        userId: req.userId,
        id: { not: id },
      },
      data: { isDefault: false },
    });
  }
  return res.status(200).json({
    message: 'User address updated successfully.',
    address: updatedAddress,
  });

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

export async function addProductToWishlist(req, res) {
  const { id } = req.params;
  const userId = req.userId;

  if (!id) {
    return res.status(401).json({ message: 'product id is required' });
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    const wishlistItem = await prisma.wishlist.create({
      data: {
        userId,
        productId: id,
      },
      include: { product: true },
    });

    res.status(201).json({
      message: 'Product added to wishlist successfully.',
      wishlistItem,
    });
  } catch (error) {
    if (error.code === 'P2002') {
      return res
        .status(409)
        .json({ message: 'Product is already in wishlist.' });
    }

    res.status(500).json({
      message: 'Error adding product to wishlist.',
      error: error.message,
    });
  }
}

export async function getUserWishlist(req, res) {
  try {
    const wishlist = await prisma.wishlist.findMany({
      where: { userId: req.userId },
      include: { product: true },
    });

    res.status(200).json({
      message: 'User wishlist fetched successfully.',
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching user wishlist.',
      error: error.message,
    });
  }
}

export async function deleteUserWishlist(req, res) {
  const { id } = req.params;
  if (!id) {
    return res.status(401).json({ message: 'Product id is required' });
  }

  try {
    const wishlistItem = await prisma.wishlist.findUnique({
      where: {
        id,
        userId: req.userId,
      },
    });

    if (!wishlistItem) {
      return res.status(404).json({ message: 'Wishlist item not found.' });
    }

    await prisma.wishlist.delete({
      where: { id },
    });

    res.status(200).json({
      message: 'Product was removed from wishlist .',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error removing product from wishlist.',
      error: error.message,
    });
  }
}
