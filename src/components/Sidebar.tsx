'use client'

import {
  Apple,
  Baby,
  Book,
  Car,
  Dog,
  Dumbbell,
  Gamepad,
  Heart,
  Home as HomeIcon,
  PaintBucket,
  PenTool,
  Plane,
  Shirt,
  Sparkles,
  Tv,
  Utensils
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const categories = [
  { id: 'fashion', name: '패션의류/잡화', icon: Shirt },
  { id: 'beauty', name: '뷰티', icon: Sparkles },
  { id: 'baby', name: '출산/유아동', icon: Baby },
  { id: 'food', name: '식품', icon: Apple },
  { id: 'kitchen', name: '주방용품', icon: Utensils },
  { id: 'living', name: '생활용품', icon: HomeIcon },
  { id: 'home-interior', name: '홈인테리어', icon: PaintBucket },
  { id: 'digital', name: '가전디지털', icon: Tv },
  { id: 'sports', name: '스포츠/레저', icon: Dumbbell },
  { id: 'auto', name: '자동차용품', icon: Car },
  { id: 'books', name: '도서/음반/DVD', icon: Book },
  { id: 'hobby', name: '완구/취미', icon: Gamepad },
  { id: 'office', name: '문구/오피스', icon: PenTool },
  { id: 'pet', name: '반려동물용품', icon: Dog },
  { id: 'health', name: '헬스/건강식품', icon: Heart },
  { id: 'travel', name: '여행/티켓', icon: Plane },
]

export default function Sidebar() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const pathname = usePathname()
  const currentCategory = categories.find(category => pathname.includes(`/category/${category.id}`))

  return (
    <aside className="w-14 bg-white shadow-md h-screen sticky top-0 flex flex-col items-center justify-between py-2 z-40">
      {categories.map((category, index) => (
        <div key={category.id} className="relative group">
          <Link href={`/category/${category.id}`}>
            <div 
              className={`p-1.5 rounded-lg transition-all duration-200 ${
                currentCategory?.id === category.id 
                  ? 'bg-blue-100' 
                  : 'hover:bg-gray-100'
              }`}
              onMouseEnter={() => setActiveCategory(category.id)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <category.icon className={`w-4 h-4 transition-all duration-200 ${
                currentCategory?.id === category.id 
                  ? 'text-blue-500' 
                  : 'text-gray-500'
              } group-hover:w-5 group-hover:h-5`} />
            </div>
          </Link>
          {activeCategory === category.id && (
            <div 
              className={`absolute left-full ml-2 bg-white shadow-md rounded-md p-2 whitespace-nowrap text-xs z-45 ${
                index > categories.length - 3 ? 'bottom-0' : 'top-0'
              }`}
            >
              {category.name}
            </div>
          )}
        </div>
      ))}
    </aside>
  )
}