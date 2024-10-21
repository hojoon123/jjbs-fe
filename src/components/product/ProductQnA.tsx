'use client';
import { ProductQnAProps } from '@/services/types/product';

export function ProductQnA({ qna }: ProductQnAProps) {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-4">상품 Q&A</h2>
      {qna.length > 0 ? (
        qna.map((question) => (
          <div key={question.id} className="mb-6">
            <div className="mb-2">
              <span className="font-semibold">{question.user}</span>
              <span className="ml-2 text-sm text-gray-600">{new Date(question.created_at).toLocaleDateString()}</span>
            </div>
            <p>{question.content}</p>
            <div className="mt-4 ml-4">
              {question.answers.length > 0 ? (
                question.answers.map((answer) => (
                  <div key={answer.id} className="border-l-2 pl-4 mb-4">
                    <div className="flex justify-between">
                      <span className="font-semibold">{answer.user}</span>
                      <span className="text-sm text-gray-600">{new Date(answer.created_at).toLocaleDateString()}</span>
                    </div>
                    <p>{answer.content}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">아직 답변이 없습니다.</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>등록된 문의가 없습니다.</p>
      )}
    </div>
  );
}