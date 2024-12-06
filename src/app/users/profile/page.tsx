// // src/app/users/profile/page.tsx
import { OrderHistorySection } from '@/components/mypage/OrderHistorySection';
import { PaymentMethodSection } from '@/components/mypage/PaymentMethodSection';
import { ProfileSection } from '@/components/mypage/ProfileSection';
import { SettingsSection } from '@/components/mypage/SettingsSection';
import { ShippingAddressSection } from '@/components/mypage/ShippingAddressSection';
import { WishlistSection } from '@/components/mypage/WishlistSection';
import { userApi } from '@/services/api/serverUserApi';
import { checkAndRefreshToken } from '@/services/utils/serverUtils';
import { redirect } from 'next/navigation';

export default async function MyPage() {
  // 토큰 유효성 체크 및 갱신
  const accessToken = await checkAndRefreshToken();
  // 토큰이 없으면 로그인 페이지로 리다이렉트
  if (!accessToken) {
    return redirect('/users/login');
  }

  // 이메일 변경 처리
  const handleUpdateEmail = async (email: string) => {
    try {
      await userApi.updateUserProfile({ email });
      alert('이메일이 성공적으로 변경되었습니다.');
    } catch (error: any) {
      if (error.response?.status === 400) {
        // 서버에서 중복된 이메일 에러 반환 시 처리
        const errorMessage = error.response?.data?.email?.[0];
        if (errorMessage && errorMessage.includes('already exists')) {
          alert('이미 존재하는 이메일입니다.');
          return;
        }
      }
      // 기타 에러 처리
      alert('이메일 변경에 실패했습니다. 나중에 다시 시도해주세요.');
    }
  };

  // 비밀번호 변경 처리
  const handleChangePassword = async (newPassword: string) => {
    try {
      await userApi.changePassword({ password: newPassword });
    } catch (error) {
      console.error('비밀번호 변경 실패:', error);
      throw new Error('비밀번호 변경 실패');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">마이페이지</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProfileSection onUpdateEmail={handleUpdateEmail}
          onChangePassword={handleChangePassword} />
        <OrderHistorySection orderCount={0} />
        <ShippingAddressSection primaryAddress={''} />
        <PaymentMethodSection primaryPaymentMethod={''} />
        <WishlistSection wishlistCount={0} />
        <SettingsSection />
      </div>
    </div>
  );
}
