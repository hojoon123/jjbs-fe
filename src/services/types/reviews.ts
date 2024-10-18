export interface Review {
    id: number;
    user: string;
    content: string;
    created_at: string;  // 리뷰 작성 시간
  }
  
export interface ReviewResponse {
  reviews: Review[];  // 리뷰 배열
}
  