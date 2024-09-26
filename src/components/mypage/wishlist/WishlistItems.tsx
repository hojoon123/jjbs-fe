import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from 'lucide-react';
import Image from 'next/image';

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface WishlistItemsProps {
  items: WishlistItem[];
}

export function WishlistItems({ items }: WishlistItemsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <div key={item.id} className="border rounded-lg p-4">
          <Image src={item.image} alt={item.name} width={200} height={200} className="mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
          <p className="text-gray-600 mb-4">{item.price.toLocaleString()}원</p>
          <div className="flex justify-between">
            <Button variant="outline" size="sm">
              <Heart className="mr-2 h-4 w-4" /> 삭제
            </Button>
            <Button size="sm">
              <ShoppingCart className="mr-2 h-4 w-4" /> 장바구니에 추가
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}