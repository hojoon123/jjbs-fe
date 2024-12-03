'use client';

import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { EmailModal } from './profile/EmailModal';
import { PasswordModal } from './profile/PasswordModal';

export function ProfileSection() {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();

  // 로그인 상태 체크 후 리다이렉트
  useEffect(() => {
    if (!user.isAuthenticated) {
      router.push('/users/login');
    }
  }, [user.isAuthenticated, router]);

  const getSubscriptionColor = (plan: string) => {
    switch (plan) {
      case 'free':
        return 'bg-gray-200 text-gray-700';
      case 'basic':
        return 'bg-blue-200 text-blue-700';
      case 'pro':
        return 'bg-purple-200 text-purple-700';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">프로필</h2>
      <div className="mb-4">
        <p className="font-medium">이름: {user.first_name} {user.last_name}</p>
        <p className="text-gray-600">이메일: {user.email}</p>
        <button onClick={() => setShowEmailModal(true)} className="text-blue-600 hover:underline">이메일 수정</button>
      </div>
      <div className="mb-4">
        <span className={`px-2 py-1 rounded-full text-sm font-medium ${getSubscriptionColor(user.userprofile?.subscription_plan || 'free')}`}>
          {(user.userprofile?.subscription_plan || 'free').toUpperCase()}
        </span>
      </div>
      <button onClick={() => setShowPasswordModal(true)} className="text-blue-600 hover:underline">비밀번호 수정</button>
      {/* 이메일 및 비밀번호 수정 모달 */}
      {showEmailModal && <EmailModal closeModal={() => setShowEmailModal(false)} />}
      {showPasswordModal && <PasswordModal closeModal={() => setShowPasswordModal(false)} />}
    </div>
  );
}