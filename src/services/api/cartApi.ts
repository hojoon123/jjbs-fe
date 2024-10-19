import { fetchWithToken } from '../utils/clientUtils';
import { BASE_URL } from '../utils/constants';

export const cartApi = {
  addToCart: async (data: { product: number, option?: number | null, quantity: number }) => {
    return fetchWithToken(`${BASE_URL}/mall/cart-products/`, 'POST', data);
  },
};
