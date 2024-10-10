import { OrderHistorySection } from '@/components/mypage/OrderHistorySection'
import { PaymentMethodSection } from '@/components/mypage/PaymentMethodSection'
import { ProfileSection } from '@/components/mypage/ProfileSection'
import { SettingsSection } from '@/components/mypage/SettingsSection'
import { ShippingAddressSection } from '@/components/mypage/ShippingAddressSection'
import { WishlistSection } from '@/components/mypage/WishlistSection'
import { userApi } from '@/services/api/userApi'

export default async function MyPage() {
  const userData = await userApi.getUserProfile();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">마이페이지</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProfileSection userData={userData} />
        <OrderHistorySection orderCount={userData.userprofile.orderCount || 0} />
        <ShippingAddressSection primaryAddress={userData.userprofile.primaryAddress || ''} />
        <PaymentMethodSection primaryPaymentMethod={userData.userprofile.primaryPaymentMethod || ''} />
        <WishlistSection wishlistCount={userData.userprofile.wishlistCount || 0} />
        <SettingsSection />
      </div>
    </div>
  )
}
