import { fetchWithToken } from '../utils/clientUtils';

const BASE_URL = 'https://5138-222-102-164-25.ngrok-free.app';
  
export const productApi =  {
    // 상품 상세 조회 API
    getProductDetail: async (id: string) => {
      return fetchWithToken(`${BASE_URL}/mall/products/${id}`, 'GET');
    },

    // 상품 리스트 조회 API
    getProductList: async (categoryId?: string, subCategoryId?: string, subDetailCategoryId?: string, limit = 10, page = 1) => {
        let query = `?limit=${limit}&page=${page}`;
        if (categoryId) query += `&category_id=${categoryId}`;
        if (subCategoryId) query += `&subcategory_id=${subCategoryId}`;
        if (subDetailCategoryId) query += `&sub_detail_category_id=${subDetailCategoryId}`;

        return fetchWithToken(`${BASE_URL}/mall/products/${query}`, 'GET');
    },

    // 상품 옵션 조회 API
    getProductOptions: async (productId: string) => {
    const response = await fetchWithToken(`${BASE_URL}/mall/product-options/?product_id=${productId}`, 'GET');
    return response.options; // options 배열만 리턴
  },
}
  