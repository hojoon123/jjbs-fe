import { productApi } from '@/services/api/productApi';
import { Product } from '@/services/types/product';
import ProductCard from './ProductCard';

async function getCategoryProducts(categoryId: string): Promise<Product[]> {
  const productList = await productApi.getProductList(categoryId);
  return productList.results;
}

export default async function ProductGrid({ categoryId }: { categoryId: string }) {
  const products = await getCategoryProducts(categoryId);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
