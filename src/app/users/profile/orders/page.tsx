import { OrderHistoryList } from '@/components/mypage/orders/OrderHistoryList'
import { Package } from 'lucide-react'

export default function OrderHistoryPage() {
  // 이 부분은 실제로는 서버에서 데이터를 가져와야 합니다.
  const orders = [
    { id: '1', date: '2023-09-24', total: 59800, status: '배송 완료' },
    { id: '2', date: '2023-09-20', total: 29900, status: '배송 중' },
    { id: '3', date: '2023-09-15', total: 89700, status: '주문 확인' },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <Package className="mr-2" />
        주문 내역
      </h1>
      <OrderHistoryList orders={orders} />
    </div>
  )
}