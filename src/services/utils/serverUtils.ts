import { cookies } from 'next/headers';
const BASE_URL = 'https://3618-61-84-218-100.ngrok-free.app';

// 쿠키에서 토큰을 가져오는 함수
export const getToken = (tokenName: string) => {
  const cookieStore = cookies();
  return cookieStore.get(tokenName)?.value || null;
};

// 쿠키에서 토큰을 삭제하는 함수
export const deleteToken = (tokenName: string) => {
  const cookieStore = cookies();
  cookieStore.delete(tokenName);  // 쿠키 삭제
};


// accessToken을 갱신하는 함수
export const refreshToken = async () => {
  const response = await fetch(`${BASE_URL}/users/token/refresh/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('토큰 갱신 실패');
  }

  return await response.json();
};

// accessToken 만료 시간 체크 및 갱신 함수
export const checkAndRefreshToken = async () => {
  const accessToken = getToken('access_token');
  const refreshTokenValue = getToken('refresh_token');
  if (!accessToken) {
    if (!refreshTokenValue) {
      return null;
    }
    try {
      const refreshedData = await refreshToken();
      return refreshedData.access;
    } catch (error) {
      return null;
    }
  }

  const tokenPayload = JSON.parse(atob(accessToken.split('.')[1]));
  const expiration = tokenPayload.exp * 1000;
  const currentTime = Date.now();

  if (expiration - currentTime < 5 * 60 * 1000) { 
    const refreshedData = await refreshToken();
    return refreshedData.access;
  }

  return accessToken;
};