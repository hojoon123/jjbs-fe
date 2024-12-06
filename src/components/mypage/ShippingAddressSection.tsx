'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';

interface ShippingAddressSectionProps {
  primaryAddress: string;
}

export function ShippingAddressSection({ primaryAddress }: ShippingAddressSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">

          배송지 관리
        </CardTitle>
        <CardDescription>배송지를 추가하여 편리하게 배송 받으세요</CardDescription>
      </CardHeader>
      <CardContent>
        <p><strong>기본 배송지:</strong> {primaryAddress}</p>
        <Link href="/users/profile/addresses">
          <Button className="mt-4">배송지 관리</Button>
        </Link>
      </CardContent>
    </Card>
  )
}