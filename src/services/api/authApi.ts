import { signUpData } from '../types/userData';
import { BASE_URL } from '../utils/constants';

export const authApi = {
  signUp: async (userData: signUpData) => {
    const response = await fetch(`${BASE_URL}/users/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('회원가입 실패');
    }

    return response.json(); // 서버 응답 처리
  },

  login: async (username: string, password: string) => {
    const response = await fetch(`${BASE_URL}/users/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('로그인 실패');
    }

    return response.json();
  },

  logout: async () => {
    const response = await fetch(`${BASE_URL}/users/logout/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',  // 쿠키를 함께 전송
    });

    if (!response.ok) {
      throw new Error(`로그아웃 실패: ${response.status}`);
    }

    return response.json();  // 서버 응답 처리
  }
};
