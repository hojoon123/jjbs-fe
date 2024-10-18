import { Review } from '@/services/types/reviews';

interface ProductReviewProps {
  reviews: Review[];
}

export function ProductReview({ reviews }: ProductReviewProps) {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-4">상품평</h2>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="mb-4 pb-4 border-b last:border-b-0">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">{review.user}</span>
              <div className="flex items-center">
                <span className="ml-2 text-sm text-gray-600">
                  {new Date(review.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
            <p>{review.content}</p>
          </div>
        ))
      ) : (
        <p>등록된 리뷰가 없습니다.</p>
      )}
    </div>
  );
}
