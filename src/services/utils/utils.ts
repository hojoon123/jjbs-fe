import { cookies } from 'next/headers';
const BASE_URL = 'https://5138-222-102-164-25.ngrok-free.app';

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
  const refreshTokenValue = getToken('refresh_token');
  const response = await fetch(`${BASE_URL}/users/token/refresh/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh: refreshTokenValue }),
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

// 토큰을 포함하여 fetch 요청을 처리하는 함수
export const fetchWithToken = async (url: string, method: string, body?: any) => {
  const token = await checkAndRefreshToken();
  const options: RequestInit = {
    method,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: body ? JSON.stringify(body) : null,
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`요청 실패: ${response.status}`);
  }

  return response.json();
};
