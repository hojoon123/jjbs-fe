'use client'

import { usePathname } from 'next/navigation'
import Sidebar from './Sidebar'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isCategoryPage = pathname.startsWith('/category')

  return (
    <div className="flex flex-grow">
      {!isCategoryPage && <Sidebar />}
      <main className="flex-grow">
        {children}
      </main>
    </div>
  )
}