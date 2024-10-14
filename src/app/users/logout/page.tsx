"use client";

import { authApi } from '@/services/api/authApi';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      await authApi.logout();  // 로그아웃 처리
      router.push('/');        // 메인 페이지로 이동
    };

    logout();
  }, []);

  return null; // 화면에 표시할 내용이 없으므로 null 반환
}
