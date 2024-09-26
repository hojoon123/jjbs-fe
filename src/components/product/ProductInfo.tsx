import { Star } from 'lucide-react'

interface ProductInfoProps {
  name: string
  price: number
  originalPrice: number
  discount: number
  rating: number
  reviewCount: number
  description: string
}

export function ProductInfo({ name, price, originalPrice, discount, rating, reviewCount, description }: ProductInfoProps) {
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
    ))
  }

  return (
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{name}</h1>

      <div className="mt-3">
        <h2 className="sr-only">제품 정보</h2>
        <p className="text-3xl text-gray-900">{price.toLocaleString()}원</p>
        <p className="mt-1">
          <span className="text-lg text-gray-500 line-through">{originalPrice.toLocaleString()}원</span>
          <span className="ml-2 text-lg font-medium text-red-600">{discount}% 할인</span>
        </p>
      </div>

      <div className="mt-3">
        <div className="flex items-center">
          <div className="flex items-center">
            {renderStars(rating)}
          </div>
          <p className="sr-only">{rating}점</p>
          <a href="#" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
            {reviewCount}개의 리뷰
          </a>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="sr-only">설명</h3>
        <div className="text-base text-gray-700" dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    </div>
  )
}