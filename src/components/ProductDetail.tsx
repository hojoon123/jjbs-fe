'use client'

import { reviewsApi } from '@/services/api/reviewsApi'
import { ProductDetail as ProductDetailType } from '@/services/types/product'
import { Review } from '@/services/types/reviews'
import { motion } from 'framer-motion'
import { Truck } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { ProductImages } from './product/ProductImages'
import { ProductInfo } from './product/ProductInfo'
import { ProductOptions } from './product/ProductOptions'
import { ProductReview } from './product/ProductReview'

interface ProductDetailProps {
  product: ProductDetailType;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [tempItems, setTempItems] = useState<Array<{ option: string; quantity: number }>>([])
  const [selectedOption, setSelectedOption] = useState<{ name: string, additional_price: number }>({ name: '', additional_price: 0 });
  const [activeTab, setActiveTab] = useState('상세정보')
  const [isTabsSticky, setIsTabsSticky] = useState(false)
  const [reviews, setReviews] = useState<Review[]>([]);
  
  const tabsRef = useRef<HTMLDivElement>(null)
  const tabsWrapperRef = useRef<HTMLDivElement>(null)
  const detailsRef = useRef<HTMLDivElement>(null)
  const shippingRef = useRef<HTMLDivElement>(null)
  const reviewsRef = useRef<HTMLDivElement>(null)
  const qnaRef = useRef<HTMLDivElement>(null)

  const handleAddToTemp = (option: { name: string, additional_price: number }, quantity: number) => {
    setSelectedOption(option);  // 옵션을 선택할 때 상태 업데이트
    setTempItems([...tempItems, { option: option.name, quantity }]);
  };

  const handleRemoveFromTemp = (index: number) => {
    setTempItems(tempItems.filter((_, i) => i !== index));
  };

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    async function fetchReviews() {
      const response = await reviewsApi.getProductReviews(product.id);
      setReviews(response.reviews);  // API에서 받아온 데이터를 상태로 설정
    }

    fetchReviews();
  }, [product.id]);

  useEffect(() => {
    const handleScroll = () => {
      if (tabsRef.current && tabsWrapperRef.current) {
        const tabsRect = tabsRef.current.getBoundingClientRect()
        const wrapperRect = tabsWrapperRef.current.getBoundingClientRect()
        const shouldBeSticky = wrapperRect.top <= 0 && wrapperRect.bottom > tabsRect.height
        setIsTabsSticky(shouldBeSticky)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        <ProductImages images={product.images} />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0"
        >
          <ProductInfo 
            name={product.name}
            price={product.price}
            salesCount={product.sales_count}
            rating={4}
            reviewCount={product.view_count}
            description={product.description}
            selectedOption={selectedOption}
          />

          <ProductOptions 
            productId={product.id}
            options={product.options}
            onAddToTemp={handleAddToTemp}
            onRemoveFromTemp={handleRemoveFromTemp}
            tempItems={tempItems}
          />

          <div className="mt-6 flex items-center">
            <Truck className="h-5 w-5 text-gray-400" />
            <span className="ml-2 text-sm text-gray-500">무료 배송</span>
          </div>
        </motion.div>
      </div>

      <div className="mt-16" ref={tabsWrapperRef}>
        <div 
          ref={tabsRef}
          className={`bg-white ${
            isTabsSticky ? 'fixed top-0 left-0 right-0 z-10 shadow-md' : ''
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex justify-between" aria-label="Tabs">
              {['상세정보', '배송/환불', '상품평', 'Q&A'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab)
                    switch(tab) {
                      case '상세정보':
                        scrollToSection(detailsRef)
                        break
                      case '배송/환불':
                        scrollToSection(shippingRef)
                        break
                      case '상품평':
                        scrollToSection(reviewsRef)
                        break
                      case 'Q&A':
                        scrollToSection(qnaRef)
                        break
                    }
                  }}
                  className={`${
                    activeTab === tab
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {isTabsSticky && <div style={{ height: '52px' }} />}

        <div ref={detailsRef} className="mt-8">
          <h2 className="text-2xl font-bold mb-4">상세정보</h2>
          <div dangerouslySetInnerHTML={{ __html: product.description }} />
        </div>

        <div ref={shippingRef} className="mt-16">
          <h2 className="text-2xl font-bold mb-4">배송/환불</h2>
          {product.shippingInfo ? (
            <ul>
              {product.shippingInfo.split('\n').map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>배송 및 반품 정보가 없습니다.</p>
          )}
        </div>

        <ProductReview reviews={reviews} />

        <div ref={qnaRef} className="mt-16">
          <h2 className="text-2xl font-bold mb-4">Q&A</h2>
          <p>등록된 문의가 없습니다.</p>
        </div>
      </div>
    </div>
  )
}