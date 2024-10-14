// src/app/users/profile/page.tsx
import { OrderHistorySection } from '@/components/mypage/OrderHistorySection';
import { PaymentMethodSection } from '@/components/mypage/PaymentMethodSection';
import { ProfileSection } from '@/components/mypage/ProfileSection';
import { SettingsSection } from '@/components/mypage/SettingsSection';
import { ShippingAddressSection } from '@/components/mypage/ShippingAddressSection';
import { WishlistSection } from '@/components/mypage/WishlistSection';
import { userApi } from '@/services/api/userApi';
import { checkAndRefreshToken } from '@/services/utils/utils'; // 토큰 갱신 함수 가져오기
import { redirect } from 'next/navigation';

export default async function MyPage() {
  // 토큰 유효성 체크 및 갱신 처리
  const validToken = await checkAndRefreshToken();
  if (!validToken) {
    return redirect('/users/login'); // 로그인 페이지로 리다이렉트
  }
  const userProfile = await userApi.getUserProfile();

  // 유효한 토큰이 있다면 API 호출을 통해 프로필 정보 가져오기
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
  );
}
