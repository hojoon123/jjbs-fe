import { fetchWithToken } from '../utils/clientUtils';

const BASE_URL = 'https://mkdarhvvhf.execute-api.ap-northeast-2.amazonaws.com/dev';

export const cartApi = {
  addToCart: async (data: { product: number, option?: number | null, quantity: number }) => {
    return fetchWithToken(`${BASE_URL}/mall/cart-products/`, 'POST', data);
  },
};
