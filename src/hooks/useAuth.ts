import { useEffect, useState } from 'react';
import { authApi } from '../services/api/authApi';
import { userApi } from '../services/api/userApi';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // 로그인 상태

  // 로그인 함수
  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      const response = await authApi.login(username, password);
      setIsLoggedIn(true);  // 로그인 성공 시 상태 업데이트
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  // 로그아웃 함수
  const logout = async () => {
    try {
      setLoading(true);
      await authApi.logout();
      setIsLoggedIn(false);  // 로그아웃 후 로그인 상태 초기화
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  // 사용자 프로필 정보 로딩
  const loadUserProfile = async () => {
    try {
      setLoading(true);
      const userProfile = await userApi.getUserProfile();
      setUser(userProfile);  // 프로필 정보 설정
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 사용자 정보 불러오기
  useEffect(() => {
    loadUserProfile();
  }, []);

  return {
    user,
    isLoggedIn,  // 로그인 상태 반환
    loading,
    error,
    login,
    logout,
  };
};
