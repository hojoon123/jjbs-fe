import ProductDetail from '@/components/ProductDetail'

async function getProduct(id: string) {
  // 이 부분은 실제 데이터를 가져오는 로직으로 대체되어야 합니다.
  return {
    id: 1,
    name: "Roomxyd 사계절 침대 토퍼 폭신한 매트리스 13cm",
    price: 23120,
    originalPrice: 69900,
    discount: 66,
    images: [
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
    ],
    options: ["슈퍼싱글", "퀸", "킹"],
    description: "사계절 내내 편안한 수면을 위한 최고의 선택",
    details: `
      <h3>제품 소개</h3>
      <p>Roomxyd 사계절 침대 토퍼는 최고급 소재와 뛰어난 기술력으로 제작되었습니다.</p>
      <h3>사용 방법</h3>
      <p>침대나 바닥에 깔아 사용하시면 됩니다. 커버는 분리하여 세탁할 수 있습니다.</p>
      <h3>주의 사항</h3>
      <p>직사광선을 피해 보관해 주세요. 세탁 시 찬물을 사용하시고, 건조기 사용은 피해주세요.</p>
    `,
    shippingImage: "/placeholder.svg?height=400&width=800&text=배송+정보",
    seller: {
      name: "한중무역 / JIN MINGZI",
      contact: "1577-7011",
      address: "경기도 부천시 호현로451번가길 22 (소사본동)",
    },
    reviews: [
      { id: 1, user: "홍길동", rating: 5, date: "2024.09.20", content: "정말 폭신하고 좋아요. 숙면에 도움이 많이 됩니다." },
      { id: 2, user: "김철수", rating: 4, date: "2024.09.15", content: "가격 대비 만족스러워요. 배송도 빨랐습니다." },
    ],
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)

  return <ProductDetail product={product} />
}