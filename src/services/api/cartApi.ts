import { fetchWithToken } from '../utils/clientUtils';

const BASE_URL = 'https://3618-61-84-218-100.ngrok-free.app';

export const cartApi = {
  addToCart: async (data: { product: number, option?: number | null, quantity: number }) => {
    return fetchWithToken(`${BASE_URL}/mall/cart-products/`, 'POST', data);
  },
};
