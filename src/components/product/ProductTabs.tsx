import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ProductTabsProps {
  details: string
  shippingInfo?: string
  reviews: Array<{
    id: number
    user: string
    rating: number
    date: string
    content: string
  }>
}

export function ProductTabs({ details, shippingInfo, reviews }: ProductTabsProps) {
  return (
    <Tabs defaultValue="details" className="w-full mt-12">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="details">상세정보</TabsTrigger>
        <TabsTrigger value="shipping">배송/환불</TabsTrigger>
        <TabsTrigger value="reviews">상품평</TabsTrigger>
        <TabsTrigger value="qna">Q&A</TabsTrigger>
      </TabsList>
      <TabsContent value="details">
        <Card>
          <CardContent className="mt-4">
            <div dangerouslySetInnerHTML={{ __html: details }} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="shipping">
        <Card>
          <CardContent className="mt-4">
            {shippingInfo ? (
              <ul>
                {shippingInfo.split('\n').map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>배송 및 반품 정보가 없습니다.</p>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="reviews">
        <Card>
          <CardContent className="mt-4">
            {reviews.map((review) => (
              <div key={review.id} className="mb-4 pb-4 border-b last:border-b-0">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">{review.user}</span>
                  <div className="flex items-center">
                    {/* Implement renderStars function here */}
                    <span className="ml-2 text-sm text-gray-600">{review.date}</span>
                  </div>
                </div>
                <p>{review.content}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="qna">
        <Card>
          <CardContent className="mt-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">상품 Q&A</h3>
              <Button variant="outline">문의하기</Button>
            </div>
            <p>등록된 문의가 없습니다.</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}