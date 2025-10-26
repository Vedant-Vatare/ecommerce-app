import { useQuery } from '@tanstack/react-query';
import { getProductRecommendations } from '@/services/product/collection';

export const useProductRecommendations = ({ productIds, categorySlugs }) => {
  return useQuery({
    queryKey: ['product-recommendations', { productIds, categorySlugs }],
    queryFn: () => getProductRecommendations({ productIds, categorySlugs }),
  });
};
