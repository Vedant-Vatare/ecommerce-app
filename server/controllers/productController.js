import prisma from '../db/db.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

export async function createProduct(req, res) {
  if (!req.files || req.files.length === 0) {
    return res.status(401).json({ message: 'At least one image is required.' });
  }

  try {
    const imageURLs = await uploadOnCloudinary(req.files);
    const product = await prisma.product.create({
      data: {
        ...req.validatedBody,
        images: imageURLs,
      },
    });
    res.status(201).json({ message: 'Product created successfully.', product });
  } catch (error) {
    res.status(500).json({ message: 'Error creating product.', error });
  }
}

export async function getProductById(req, res) {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    res.status(200).json({ message: 'Product fetched successfully.', product });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product.', error });
  }
}

export async function getProductsBySearch(req, res) {
  const { search } = req.params;
  try {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      },
      orderBy: { name: 'asc' },
    });

    if (products.length === 0) {
      return res.status(404).json({
        message: 'No products found.',
        products: [],
      });
    }

    return res
      .status(200)
      .json({ message: 'Products fetched successfully.', products });
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching products.', error });
  }
}

export async function updateProduct(req, res) {
  const { id } = req.params;

  try {
    if (req.files && req.files.length > 0) {
      const imageURLs = await uploadOnCloudinary(req.files);
      req.validatedBody.images = imageURLs;
    }
    const product = await prisma.product.update({
      where: { id },
      data: {
        ...req.validatedBody,
      },
    });
    res.status(200).json({ message: 'Product updated successfully.', product });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error updating product.', error: error.message });
  }
}

export async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    await prisma.product.delete({
      where: { id },
    });
    res.status(200).json({ message: 'Product deleted successfully.' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting product.', error: error.message });
  }
}
