import { OrderHistorySection } from '@/components/mypage/OrderHistorySection'
import { PaymentMethodSection } from '@/components/mypage/PaymentMethodSection'
import { ProfileSection } from '@/components/mypage/ProfileSection'
import { SettingsSection } from '@/components/mypage/SettingsSection'
import { ShippingAddressSection } from '@/components/mypage/ShippingAddressSection'
import { WishlistSection } from '@/components/mypage/WishlistSection'

// 서버에서 데이터를 가져오는 함수라고 가정합니다.
async function getUserData() {
  // 실제로는 여기서 데이터베이스나 API를 호출합니다.
  return {
    name: "홍길동",
    email: "hong@example.com",
    orderCount: 5,
    primaryAddress: "서울시 강남구 테헤란로 123",
    primaryPaymentMethod: "신한카드 1234",
    wishlistCount: 3
  }
}

export default async function MyPage() {
  const userData = await getUserData()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">마이페이지</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProfileSection name={userData.name} email={userData.email} />
        <OrderHistorySection orderCount={userData.orderCount} />
        <ShippingAddressSection primaryAddress={userData.primaryAddress} />
        <PaymentMethodSection primaryPaymentMethod={userData.primaryPaymentMethod} />
        <WishlistSection wishlistCount={userData.wishlistCount} />
        <SettingsSection />
      </div>
    </div>
  )
}