import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';

interface PaymentMethodSectionProps {
  primaryPaymentMethod: string;
}

export function PaymentMethodSection({ primaryPaymentMethod }: PaymentMethodSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">

          결제 수단
        </CardTitle>
        <CardDescription>결제 카드 및 계좌 관리</CardDescription>
      </CardHeader>
      <CardContent>
        <p><strong>기본 결제 수단:</strong> {primaryPaymentMethod}</p>
        <Link href="/users/profile/payment-methods">
          <Button className="mt-4">결제 수단 관리</Button>
        </Link>
      </CardContent>
    </Card>
  )
}