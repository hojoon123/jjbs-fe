'use client'

import { useState } from 'react';
import { cartApi } from '../services/api/cartApi';

export default function AddToCartButton({ productId, optionId }: { productId: number, optionId?: number }) {
  const [isLoading, setIsLoading] = useState(false)

  const addToCart = async () => {
    setIsLoading(true);
    
    try {
      await cartApi.addToCart({
        product: productId,
        option: optionId || null,
        quantity: 1, // 기본 수량 1개
      });

      alert('상품이 장바구니에 추가되었습니다.');
    } catch (error) {
      console.error('장바구니 추가 실패:', error);
      alert('장바구니 추가에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={addToCart}
      disabled={isLoading}
      className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300 disabled:bg-gray-400"
    >
      {isLoading ? '처리 중...' : '장바구니에 추가'}
    </button>
  )
}