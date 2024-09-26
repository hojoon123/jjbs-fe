import CategoryShowcase from '@/components/CategoryShowcase'
import ProductCard from '@/components/ProductCard'
import { Product } from '@/types/product'

const categories = [
  {
    id: 'home-interior',
    name: '가구/홈인테리어',
    description: '우리집 분위기 바꾸기! 아토젯 샤워기',
    image: '/placeholder.svg?height=400&width=600',
    products: [
      { id: 1, name: '아토젯 샤워기', price: 26910, image: '/placeholder.svg?height=100&width=100', promotion: '로켓배송' },
      { id: 2, name: '스테론 우아수스 스테인리스 자동센서 휴지통', price: 47310, image: '/placeholder.svg?height=100&width=100', promotion: '특가' },
      { id: 3, name: '욕실 청소 브러쉬', price: 12980, image: '/placeholder.svg?height=100&width=100', promotion: '로켓배송' },
      { id: 4, name: '스파이더락 무타공 샤워선반', price: 13900, image: '/placeholder.svg?height=100&width=100', promotion: '로켓배송' },
    ],
    keywords: ['욕실용품', '수납/정리', '리빙박스', '팬티랙', '욕실화', '욕실소품'],
  },
  {
    id: 'food',
    name: '식품',
    description: '신선한 식재료부터 간편식까지',
    image: '/placeholder.svg?height=400&width=600',
    products: [
      { id: 5, name: '햇반 즉석밥', price: 15900, image: '/placeholder.svg?height=100&width=100', promotion: '로켓배송' },
      { id: 6, name: '동원 참치캔', price: 12000, image: '/placeholder.svg?height=100&width=100', promotion: '특가' },
      { id: 7, name: '농심 신라면', price: 4980, image: '/placeholder.svg?height=100&width=100', promotion: '로켓배송' },
      { id: 8, name: '맛있는 우유', price: 3200, image: '/placeholder.svg?height=100&width=100', promotion: '로켓프레시' },
    ],
    keywords: ['과일', '채소', '육류', '생선', '간식', '음료'],
  },
  // 다른 카테고리들도 비슷한 형식으로 추가...
]

async function getTopProducts(): Promise<Product[]> {
  // 실제 API 호출로 대체해야 합니다.
  return [
    { id: 1, name: '인기 상품 1', price: 10000, main_image_url: '/placeholder.svg?height=200&width=200' },
    { id: 2, name: '인기 상품 2', price: 20000, main_image_url: '/placeholder.svg?height=200&width=200' },
    { id: 3, name: '인기 상품 3', price: 30000, main_image_url: '/placeholder.svg?height=200&width=200' },
    { id: 4, name: '인기 상품 4', price: 40000, main_image_url: '/placeholder.svg?height=200&width=200' },
    { id: 5, name: '인기 상품 5', price: 50000, main_image_url: '/placeholder.svg?height=200&width=200' },
    { id: 6, name: '인기 상품 6', price: 60000, main_image_url: '/placeholder.svg?height=200&width=200' },
  ]
}

export default async function Home() {
  const topProducts = await getTopProducts()

  return (
    
    <div className="container mx-auto px-4 py-8">
      <section className="mb-8">
      <h2 className="text-3xl font-bold mb-8">카테고리 쇼케이스</h2>
      <div className="space-y-12">
        {categories.map((category) => (
          <CategoryShowcase key={category.id} category={category} />
        ))}
      </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">인기 상품</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {topProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}