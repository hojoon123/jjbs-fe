import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';

interface OrderHistorySectionProps {
  orderCount: number;
}

export function OrderHistorySection({ orderCount }: OrderHistorySectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">

          주문 내역
        </CardTitle>
        <CardDescription>최근 주문 및 배송 현황</CardDescription>
      </CardHeader>
      <CardContent>
        <p>총 {orderCount}개의 주문</p>
        <Link href="/users/profile/orders" className="text-blue-500 hover:underline">
          주문 내역 보기
        </Link>
      </CardContent>
    </Card>
  )
}