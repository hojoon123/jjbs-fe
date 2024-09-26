import { Product } from '@/types/product'
import ProductCard from './ProductCard'

async function getCategoryProducts(categoryId: string): Promise<Product[]> {
  // 실제 API 호출로 대체해야 합니다.
  return [
    { id: 1, name: '상품 1', price: 10000, main_image_url: '/placeholder.svg?height=200&width=200' },
    { id: 2, name: '상품 2', price: 20000, main_image_url: '/placeholder.svg?height=200&width=200' },
    { id: 3, name: '상품 3', price: 30000, main_image_url: '/placeholder.svg?height=200&width=200' },
    { id: 4, name: '상품 4', price: 40000, main_image_url: '/placeholder.svg?height=200&width=200' },
  ]
}

export default async function ProductGrid({ categoryId }: { categoryId: string }) {
  const products = await getCategoryProducts(categoryId)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}