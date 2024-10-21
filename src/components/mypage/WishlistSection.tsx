'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';

interface WishlistSectionProps {
  wishlistCount: number;
}

export function WishlistSection({ wishlistCount }: WishlistSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          찜한 상품
        </CardTitle>
        <CardDescription>관심 상품 목록</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{wishlistCount}개의 찜한 상품</p>
        <Link href="/users/profile/wishlist" className="text-blue-500 hover:underline">
          찜 목록 보기
        </Link>
      </CardContent>
    </Card>
  )
}