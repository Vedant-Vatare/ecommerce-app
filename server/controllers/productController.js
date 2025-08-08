import prisma from '../db/db.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

export async function createProduct(req, res) {
  if (!req.files || req.files.length === 0) {
    return res.status(401).json({ message: 'At least one image is required.' });
  }
  const imageURLs = await uploadOnCloudinary(req.files);

  try {
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
