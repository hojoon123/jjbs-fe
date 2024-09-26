import { ShoppingCart } from 'lucide-react'

import { CartList } from '@/components/cart/CartList'
import { OrderSummary } from '@/components/cart/OrderSummary'

export default function CartPage() {
  // 이 부분은 실제로는 서버에서 데이터를 가져와야 합니다.
  const cartItems = [
    { id: 1, name: "프리미엄 티셔츠", price: 29900, quantity: 2, image: "/placeholder.svg" },
    { id: 2, name: "편안한 청바지", price: 59900, quantity: 1, image: "/placeholder.svg" },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingFee = 3000

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <ShoppingCart className="mr-2" />
        장바구니
      </h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <CartList initialItems={cartItems} />
        </div>
        <div className="md:w-1/3">
          <OrderSummary subtotal={subtotal} shippingFee={shippingFee} />
        </div>
      </div>
    </div>
  )
}