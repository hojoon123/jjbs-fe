'use client'

import { useState } from 'react'

export default function AddToCartButton({ productId }: { productId: number }) {
  const [isLoading, setIsLoading] = useState(false)

  const addToCart = async () => {
    setIsLoading(true)
    // 여기에 실제 장바구니 추가 로직을 구현해야 합니다.
    await new Promise(resolve => setTimeout(resolve, 1000)) // 임시 지연
    setIsLoading(false)
    alert('상품이 장바구니에 추가되었습니다.')
  }

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