import { fetchWithToken } from '../utils/clientUtils';

const BASE_URL = 'https://5138-222-102-164-25.ngrok-free.app';

export const reviewsApi = {
  getProductReviews: async (productId: string) => {
    const response = await fetchWithToken(`${BASE_URL}/mall/comments/?product_id=${productId}`,'GET');
    return response;
    },
};
