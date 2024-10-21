'use client';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  promotion?: string;
}

interface CategoryShowcaseProps {
  category: {
    id: string;
    name: string;
    description: string;
    image: string;
    products: Product[];
    keywords: string[];
  }
}

export default function CategoryShowcase({ category }: CategoryShowcaseProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="relative h-80 bg-blue-100 rounded-lg overflow-hidden">
            <Image
              src={category.image}
              alt={category.name}
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
              <h3 className="text-xl font-semibold mb-2">{category.description}</h3>
              <Link href={`/category/${category.id}`} className="inline-block bg-white text-black px-4 py-2 rounded">
                더 보기
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-4">
            {category.products.slice(0, 4).map((product) => (
              <div key={product.id} className="bg-gray-100 p-2 rounded">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={100}
                  height={100}
                  objectFit="cover"
                  className="rounded mb-2"
                />
                <h4 className="text-sm font-semibold">{product.name}</h4>
                <p className="text-xs text-gray-600">{product.price.toLocaleString()}원</p>
                {product.promotion && (
                  <span className="text-xs text-red-500">{product.promotion}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">HOT 키워드</h3>
        <div className="flex flex-wrap gap-2">
          {category.keywords.map((keyword, index) => (
            <span key={index} className="bg-gray-200 px-2 py-1 rounded text-sm">
              #{keyword}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}