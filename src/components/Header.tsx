'use client'

import { Menu, Search, ShoppingCart, User } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // This should be managed by your auth system

  const categories = [
    "패션의류/잡화", "뷰티", "출산/유아동", "식품", "주방용품", "생활용품",
    "홈인테리어", "가전디지털", "스포츠/레저", "자동차용품", "도서/음반/DVD",
    "완구/취미", "문구/오피스", "반려동물용품", "헬스/건강식품", "여행/티켓"
  ]

  return (
    <header className="border-b relative z-50">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              className="p-2 bg-black-200 text-black rounded-md flex items-center"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5 mr-2" />
              <span>카테고리</span>
            </button>
            <Link href="/" className="text-2xl font-bold text-black">
              JUNJUN
            </Link>
          </div>
          <div className="flex-grow mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="찾고 싶은 상품을 검색해보세요!"
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <Link href="/users/account" className="flex items-center text-sm">
                <User className="h-5 w-5 mr-1" />
                <span>내정보</span>
              </Link>
            ) : (
              <Link href="/users/login" className="flex items-center text-sm">
                <User className="h-5 w-5 mr-1" />
                <span>로그인</span>
              </Link>
            )}
            <Link href="/users/cart" className="flex items-center text-sm">
              <ShoppingCart className="h-5 w-5 mr-1" />
              <span>장바구니</span>
            </Link>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="absolute left-0 w-64 bg-white shadow-lg z-50 max-h-[calc(100vh-100%)] overflow-y-auto">
          <div className="py-2">
            {categories.map((category, index) => (
              <a
                key={index}
                href="#"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
              >
                {category}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}