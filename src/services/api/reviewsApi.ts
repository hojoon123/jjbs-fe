import { fetchWithToken } from '../utils/clientUtils';

const BASE_URL = 'https://3618-61-84-218-100.ngrok-free.app';

export const reviewsApi = {
  getProductReviews: async (productId: string) => {
    const response = await fetchWithToken(`${BASE_URL}/mall/comments/?product_id=${productId}`,'GET');
    return response;
    },
};
