// src/app/users/profile/page.tsx
import { OrderHistorySection } from '@/components/mypage/OrderHistorySection';
import { PaymentMethodSection } from '@/components/mypage/PaymentMethodSection';
import { ProfileSection } from '@/components/mypage/ProfileSection';
import { SettingsSection } from '@/components/mypage/SettingsSection';
import { ShippingAddressSection } from '@/components/mypage/ShippingAddressSection';
import { WishlistSection } from '@/components/mypage/WishlistSection';
import { userApi } from '@/services/api/userApi';
import { checkAndRefreshToken } from '@/services/utils/serverUtils';
import { redirect } from 'next/navigation';

export default async function MyPage() {
  // 토큰 유효성 체크 및 갱신
  const accessToken = await checkAndRefreshToken();
  // 토큰이 없으면 로그인 페이지로 리다이렉트
  if (!accessToken) {
    return redirect('/users/login');
  }
  // 사용자 프로필 데이터를 가져옴 (토큰 포함하여 fetch)
  const userData = await userApi.getUserProfile();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">마이페이지</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProfileSection userData={{ 
          fullname: `${userData.first_name} ${userData.last_name}`,
          email: userData.email, 
          userprofile: userData.userprofile,
        }} />
        <OrderHistorySection orderCount={0} />
        <ShippingAddressSection primaryAddress={''} />
        <PaymentMethodSection primaryPaymentMethod={''} />
        <WishlistSection wishlistCount={0} />
        <SettingsSection />
      </div>
    </div>
  );
}
