'use client';
import { Product } from '@/services/types/product';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.id}`} className="block">
      <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
        <Image
          src={product.main_image_url}
          alt={product.name}
          width={200}
          height={200}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
          <p className="text-gray-600">{product.price.toLocaleString()}원</p>
        </div>
      </div>
    </Link>
  )
}