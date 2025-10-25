import axios from '../api';

export async function fetchProductsByCollection(collectionSlug) {
  const response = await axios.get(
    `/product/collection?categorySlug=${collectionSlug}`,
  );
  return response.data.products;
}
