// 상품 리스트용 타입
export interface ProductList {
  id: number;
  name: string;
  price: number;
  review_count: number;
  review_score: number;
  images: Array<{ image: string }>;
}

// 상품 상세용 타입
export interface ProductDetail {
  id: string;
  name: string;
  price: number;
  description: string;
  shippingInfo?: string;
  keywords: string[];
  status: string;
  category: number;
  subcategory: number;
  sub_detail_category: number;
  specifications: {
    RAM: string;
    Storage: string;
    Battery: string;
  };
  sales_count: number;
  view_count: number;
  presentation_image: string;
  images: Array<{ id: number; image: string }>;
  options: Array<{ id: number; name: string; additional_price: number }>;
  created_at: string;
  updated_at: string;
}

// ProductInfoProps, ProductOptionsProps 타입 정의
export interface ProductInfoProps {
  name: string;
  price: number;
  salesCount: number;
  rating: number;
  reviewCount: number;
  description: string;
  selectedOption: { name: string; additional_price: number };
}

// ProductOptionsProps 타입 정의
export interface ProductOptionsProps {
  productId: string;
  options: Array<{ id: number; name: string; additional_price: number }>;
  onAddToTemp: (option: { name: string, additional_price: number }, quantity: number) => void;
  onRemoveFromTemp: (index: number) => void;
  tempItems: Array<{ option: string; quantity: number }>;
}

// 상품 리스트 응답 타입
export interface ProductListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ProductList[];
}

// 상품 상세 응답 타입
export interface ProductDetailResponse {
  product: ProductDetail;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  main_image_url: string;
}

// productTabs.tsx에서 사용할 타입 정의
export interface ProductTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  detailsRef: React.RefObject<HTMLDivElement>;
  shippingRef: React.RefObject<HTMLDivElement>;
  reviewsRef: React.RefObject<HTMLDivElement>;
  qnaRef: React.RefObject<HTMLDivElement>;
}

// productQna.tsx에서 사용할 타입 정의
export interface Answer {
  id: number;
  user: string;
  content: string;
  created_at: string;
}

export interface QnAItem {
  id: number;
  user: string;
  content: string;
  created_at: string;
  answers: Answer[];  // 답변 배열을 포함
}

export interface ProductQnAProps {
  qna: QnAItem[];  // QnA 데이터 배열
}
