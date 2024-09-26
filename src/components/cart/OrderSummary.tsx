import { Button } from "@/components/ui/button";

interface OrderSummaryProps {
  subtotal: number;
  shippingFee: number;
}

export function OrderSummary({ subtotal, shippingFee }: OrderSummaryProps) {
  const total = subtotal + shippingFee

  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">주문 요약</h2>
      <div className="flex justify-between mb-2">
        <span>소계</span>
        <span>{subtotal.toLocaleString()}원</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>배송비</span>
        <span>{shippingFee.toLocaleString()}원</span>
      </div>
      <div className="flex justify-between font-semibold text-lg mt-4 pt-4 border-t">
        <span>총계</span>
        <span>{total.toLocaleString()}원</span>
      </div>
      <Button className="w-full mt-6">결제하기</Button>
    </div>
  )
}