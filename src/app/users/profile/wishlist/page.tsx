import { WishlistItems } from '@/components/mypage/wishlist/WishlistItems'
import { Heart } from 'lucide-react'

export default function WishlistPage() {
  // 이 부분은 실제로는 서버에서 데이터를 가져와야 합니다.
  const wishlistItems = [
    { id: 1, name: '프리미엄 티셔츠', price: 29900, image: '/placeholder.svg' },
    { id: 2, name: '편안한 청바지', price: 59900, image: '/placeholder.svg' },
    { id: 3, name: '스타일리시 재킷', price: 89900, image: '/placeholder.svg' },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <Heart className="mr-2" />
        찜한 상품
      </h1>
      <WishlistItems items={wishlistItems} />
    </div>
  )
}