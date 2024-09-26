'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Subcategory {
  id: string;
  name: string;
}

interface CategorySidebarProps {
  category: {
    id: string;
    name: string;
    subcategories: Subcategory[];
  }
}

export default function CategorySidebar({ category }: CategorySidebarProps) {
  const pathname = usePathname();
  const categoryPath = pathname.split('/').slice(0, 3).join('/');

  return (
    <aside className="w-64 bg-white shadow-md h-screen sticky top-0 overflow-y-auto">
      <nav className="p-4">
        <h2 className="text-xl font-bold mb-4">{category.name}</h2>
        {category.subcategories.map((subcategory) => (
          <Link 
            key={subcategory.id} 
            href={`${categoryPath}/${subcategory.id}`}
            className="block p-2 hover:bg-gray-100 rounded"
          >
            {subcategory.name}
          </Link>
        ))}
      </nav>
    </aside>
  )
}