// // src/app/users/profile/page.tsx
// import { OrderHistorySection } from '@/components/mypage/OrderHistorySection';
// import { PaymentMethodSection } from '@/components/mypage/PaymentMethodSection';
// import { ProfileSection } from '@/components/mypage/ProfileSection';
// import { SettingsSection } from '@/components/mypage/SettingsSection';
// import { ShippingAddressSection } from '@/components/mypage/ShippingAddressSection';
// import { WishlistSection } from '@/components/mypage/WishlistSection';
// import { userApi } from '@/services/api/userApi';
// import { checkAndRefreshToken } from '@/services/utils/serverUtils';
// import { redirect } from 'next/navigation';

// export default async function MyPage() {
//   // 토큰 유효성 체크 및 갱신
//   const accessToken = await checkAndRefreshToken();
//   console.log('Access Token:', accessToken);
//   // 토큰이 없으면 로그인 페이지로 리다이렉트
//   if (!accessToken) {
//     return redirect('/users/login');
//   }
//   try {
//     // 사용자 프로필 데이터를 가져옴 (토큰 포함하여 fetch)
//     const userData = await userApi.getUserProfile();
//     console.log('User Data:', userData);

//     return (
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-2xl font-bold mb-6">마이페이지</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           <ProfileSection userData={{ 
//             fullname: `${userData.first_name} ${userData.last_name}`,
//             email: userData.email, 
//             userprofile: userData.userprofile,
//           }} />
//           <OrderHistorySection orderCount={0} />
//           <ShippingAddressSection primaryAddress={''} />
//           <PaymentMethodSection primaryPaymentMethod={''} />
//           <WishlistSection wishlistCount={0} />
//           <SettingsSection />
//         </div>
//       </div>
//     );
//   } catch (error) {
//     console.error('Error fetching user profile:', error);
//     return redirect('/users/login');
//   }
// }
// src/app/users/profile/page.tsx
import { OrderHistorySection } from '@/components/mypage/OrderHistorySection';
import { PaymentMethodSection } from '@/components/mypage/PaymentMethodSection';
import { ProfileSection } from '@/components/mypage/ProfileSection';
import { SettingsSection } from '@/components/mypage/SettingsSection';
import { ShippingAddressSection } from '@/components/mypage/ShippingAddressSection';
import { WishlistSection } from '@/components/mypage/WishlistSection';
import { userApi } from '@/services/api/userApi';
import { checkAndRefreshToken } from '@/services/utils/serverUtils';

export default async function MyPage() {
  let debugMessage = '[DEBUG] MyPage 시작\n'; // 디버깅 메시지 초기화

  // 토큰 유효성 체크 및 갱신
  let accessToken;
  try {
    accessToken = await checkAndRefreshToken();
    debugMessage += `Access Token: ${accessToken}\n`;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
    debugMessage += `[ERROR] checkAndRefreshToken 에러: ${errorMessage}\n`;
  }

  // accessToken이 없는 경우 디버깅 메시지 출력
  if (!accessToken) {
    debugMessage += '[DEBUG] Access Token이 없으므로 사용자 데이터를 가져오지 않음.\n';
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-xl font-bold mb-4">디버깅 정보</h1>
        <pre className="bg-gray-100 p-4 rounded text-sm">{debugMessage}</pre>
      </div>
    );
  }

  let userData;
  try {
    // 사용자 프로필 데이터를 가져옴
    userData = await userApi.getUserProfile();
    debugMessage += `User Data: ${JSON.stringify(userData, null, 2)}\n`;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
    debugMessage += `[ERROR] 사용자 데이터 가져오기 실패: ${errorMessage}\n`;
  }

  // userData가 없으면 디버깅 메시지 출력
  if (!userData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-xl font-bold mb-4">디버깅 정보</h1>
        <pre className="bg-gray-100 p-4 rounded text-sm">{debugMessage}</pre>
      </div>
    );
  }

  // 정상적으로 데이터를 가져왔을 때 페이지 렌더링
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">마이페이지</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProfileSection
          userData={{
            fullname: `${userData.first_name} ${userData.last_name}`,
            email: userData.email,
            userprofile: userData.userprofile,
          }}
        />
        <OrderHistorySection orderCount={0} />
        <ShippingAddressSection primaryAddress={''} />
        <PaymentMethodSection primaryPaymentMethod={''} />
        <WishlistSection wishlistCount={0} />
        <SettingsSection />
      </div>
      <h2 className="text-xl font-bold mt-8">디버깅 정보</h2>
      <pre className="bg-gray-100 p-4 rounded text-sm">{debugMessage}</pre>
    </div>
  );
}
