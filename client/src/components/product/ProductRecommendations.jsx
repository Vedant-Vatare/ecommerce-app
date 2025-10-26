import { useProductRecommendations } from '@/hooks/product';

const ProductRecommendations = ({ productIds, categorySlug }) => {
  const { data: recommendations } = useProductRecommendations({
    productIds,
    categorySlug,
  });
  return <div>Product Recommendations</div>;
};

export default ProductRecommendations;
