import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { nanoid } from 'nanoid';
cloudinary.config();

async function uploadOnCloudinary(files) {
  if (!files) return null;
  const fileArray = Array.isArray(files) ? files : [files];
  try {
    const options = {
      resource_type: 'image',
      quality: 'auto',
      fetch_format: 'auto',
      folder: 'products',
    };

    const uploadPromises = fileArray.map((file) =>
      cloudinary.uploader.upload(file.path, {
        ...options,
        public_id: `product_${Date.now()}_${nanoid()}`,
      }),
    );

    const responses = await Promise.all(uploadPromises);
    const cloudinaryImageUrls = responses.map(
      (response) => response.secure_url,
    );

    return cloudinaryImageUrls;
  } catch (error) {
    console.log('file upload error', error.message);
    return null;
  } finally {
    for (const file of fileArray) {
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    }
  }
}

export { uploadOnCloudinary };
