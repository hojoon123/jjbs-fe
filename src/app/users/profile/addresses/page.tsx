import { AddressManagement } from '@/components/mypage/addresses/AddressManagement'
import { MapPin } from 'lucide-react'

export default function AddressManagementPage() {
  // 이 부분은 실제로는 서버에서 데이터를 가져와야 합니다.
  const addresses = [
    { id: 1, name: '집', address: '서울시 강남구 테헤란로 123' },
    { id: 2, name: '회사', address: '서울시 서초구 서초대로 456' },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <MapPin className="mr-2" />
        배송지 관리
      </h1>
      <AddressManagement initialAddresses={addresses} />
    </div>
  )
}