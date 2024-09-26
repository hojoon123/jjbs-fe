import CategorySidebar from '@/components/CategorySidebar';
import ProductGrid from '@/components/ProductGrid';
import { notFound } from 'next/navigation';

type Category = {
  id: string;
  name: string;
  subcategories: { id: string; name: string }[];
};

const categories: { [key: string]: Category } = {
  'home-interior': {
    id: 'home-interior',
    name: '홈인테리어',
    subcategories: [
      { id: 'furniture', name: '가구' },
      { id: 'bedding', name: '침구' },
      { id: 'lighting', name: '조명' },
      { id: 'decoration', name: '장식/소품' },
    ]
  },
  // ... 다른 카테고리들
}

export default function CategoryPage({ params }: { params: { id: string } }) {
  const category = categories[params.id]

  if (!category) {
    notFound()
  }

  return (
    <div className="flex">
      <CategorySidebar category={category} />
      <div className="flex-grow p-8">
        <h1 className="text-3xl font-bold mb-6">{category.name}</h1>
        <ProductGrid categoryId={params.id} />
      </div>
    </div>
  )
}