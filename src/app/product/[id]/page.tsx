import ProductDetail from '@/components/ProductDetail';
import { productApi } from '@/services/api/productApi';
import { ProductDetailResponse } from '@/services/types/product';

export default async function ProductPage({ params }: { params: { id: string } }) {
  const { product }: ProductDetailResponse = await productApi.getProductDetail(params.id);

  return <ProductDetail product={product} />;
}
