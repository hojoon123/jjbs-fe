import ProductGrid from '@/components/ProductGrid';

export default async function ProductListPage() {
  const categoryId = "1";  // 예시 카테고리 ID, 실제 값은 동적으로 설정 가능

  return (
    <div>
      <h1>상품 목록</h1>
      <ProductGrid categoryId={categoryId} />
    </div>
  );
}
