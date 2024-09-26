'use client'

import { motion } from 'framer-motion'
import { Truck } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { ProductImages } from './product/ProductImages'
import { ProductInfo } from './product/ProductInfo'
import { ProductOptions } from './product/ProductOptions'

interface ProductDetailProps {
  product: {
    id: number
    name: string
    price: number
    originalPrice: number
    discount: number
    images: string[]
    options: string[]
    description: string
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
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [tempItems, setTempItems] = useState<Array<{ option: string; quantity: number }>>([])
  const [activeTab, setActiveTab] = useState('상세정보')
  const [isTabsSticky, setIsTabsSticky] = useState(false)
  
  const tabsRef = useRef<HTMLDivElement>(null)
  const tabsWrapperRef = useRef<HTMLDivElement>(null)
  const detailsRef = useRef<HTMLDivElement>(null)
  const shippingRef = useRef<HTMLDivElement>(null)
  const reviewsRef = useRef<HTMLDivElement>(null)
  const qnaRef = useRef<HTMLDivElement>(null)

  const handleAddToTemp = (option: string, quantity: number) => {
    setTempItems([...tempItems, { option, quantity }])
  }

  const handleRemoveFromTemp = (index: number) => {
    setTempItems(tempItems.filter((_, i) => i !== index))
  }

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

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
            originalPrice={product.originalPrice}
            discount={product.discount}
            rating={4}
            reviewCount={product.reviews.length}
            description={product.description}
          />

          <ProductOptions 
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
          <div dangerouslySetInnerHTML={{ __html: product.details }} />
        </div>

        <div ref={shippingRef} className="mt-16">
          <h2 className="text-2xl font-bold mb-4">배송/환불</h2>
          {product.shippingInfo ? (
            <ul>
              {product.shippingInfo.split('\n').map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>배송 및 반품 정보가 없습니다.</p>
          )}
        </div>

        <div ref={reviewsRef} className="mt-16">
          <h2 className="text-2xl font-bold mb-4">상품평</h2>
          {product.reviews.map((review) => (
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
        </div>

        <div ref={qnaRef} className="mt-16">
          <h2 className="text-2xl font-bold mb-4">Q&A</h2>
          <p>등록된 문의가 없습니다.</p>
        </div>
      </div>
    </div>
  )
}