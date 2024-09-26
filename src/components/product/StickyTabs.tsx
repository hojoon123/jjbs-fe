import { useEffect, useState } from 'react'

interface StickyTabsProps {
  onTabClick: (tab: string) => void
}

export function StickyTabs({ onTabClick }: StickyTabsProps) {
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      setIsSticky(offset > 300) // Adjust this value based on when you want the tabs to become sticky
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const tabs = ['상세정보', '배송/환불', '상품평', 'Q&A']

  return (
    <div className={`bg-white ${isSticky ? 'fixed top-0 left-0 right-0 shadow-md z-10' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              className="text-gray-600 hover:text-gray-800 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-transparent"
              onClick={() => onTabClick(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}