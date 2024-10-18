'use client'

import { Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartListProps {
  initialItems: CartItem[];
}

export function CartList({ initialItems }: CartListProps) {
  const [items, setItems] = useState(initialItems);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleRemoveItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div>
      {items.map((item) => (
        <div key={item.id} className="flex items-center border-b py-4">
          <Image src={item.image} alt={item.name} width={80} height={80} className="rounded" />
          <div className="ml-4 flex-grow">
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-gray-600">{item.price.toLocaleString()}원</p>
          </div>
          <div className="flex items-center">
            <Input
              type="number"
              value={item.quantity}
              onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
              className="w-16 text-center"
              min="1"
            />
            <Button variant="ghost" className="ml-2" onClick={() => handleRemoveItem(item.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}