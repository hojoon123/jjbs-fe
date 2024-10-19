import { fetchWithToken } from '../utils/clientUtils';
import { BASE_URL } from '../utils/constants';

export const reviewsApi = {
  getProductReviews: async (productId: string) => {
    const response = await fetchWithToken(`${BASE_URL}/mall/comments/?product_id=${productId}`,'GET');
    return response;
    },
};
