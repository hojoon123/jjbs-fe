import { cookies } from 'next/headers';
const BASE_URL = 'https://api.mnuguide.site';

// 쿠키에서 토큰을 가져오는 함수
export const getToken = (tokenName: string) => {
  const cookieStore = cookies();
  const tokenValue = cookieStore.get(tokenName)?.value || null;
  console.log(`[DEBUG] getToken: ${tokenName} = ${tokenValue}`);
  return tokenValue;
};

// 쿠키에서 토큰을 삭제하는 함수
export const deleteToken = (tokenName: string) => {
  const cookieStore = cookies();
  cookieStore.delete(tokenName); // 쿠키 삭제
  console.log(`[DEBUG] deleteToken: ${tokenName} 삭제`);
};

// accessToken을 갱신하는 함수
export const refreshToken = async () => {
  const refresh = getToken('refresh_token');

  try {
    console.log(`[DEBUG] refreshToken: 갱신 요청 시작`);
    const response = await fetch(`${BASE_URL}/users/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ refresh }),
    });

    if (!response.ok) {
      console.error(`[ERROR] refreshToken 실패: ${response.status}`);
      throw new Error('토큰 갱신 실패');
    }

    const data = await response.json();
    console.log(`[DEBUG] refreshToken 성공: 새로운 access_token = ${data.access}`);
    return data;
  } catch (error) {
    console.error(`[ERROR] refreshToken 에러 발생:`, error);
    throw error;
  }
};

// accessToken 만료 시간 체크 및 갱신 함수
export const checkAndRefreshToken = async () => {
  const accessToken = getToken('access_token');
  const refreshTokenValue = getToken('refresh_token');

  console.log(`[DEBUG] checkAndRefreshToken: accessToken = ${accessToken}, refreshToken = ${refreshTokenValue}`);

  if (!accessToken) {
    if (!refreshTokenValue) {
      console.warn(`[DEBUG] checkAndRefreshToken: accessToken과 refreshToken 모두 없음`);
      return null;
    }
    try {
      console.log(`[DEBUG] checkAndRefreshToken: accessToken이 없으므로 refreshToken 사용`);
      const refreshedData = await refreshToken();
      return refreshedData.access;
    } catch (error) {
      console.error(`[ERROR] checkAndRefreshToken: 토큰 갱신 실패`, error);
      return null;
    }
  }

  const tokenPayload = JSON.parse(atob(accessToken.split('.')[1]));
  const expiration = tokenPayload.exp * 1000;
  const currentTime = Date.now();

  console.log(`[DEBUG] checkAndRefreshToken: 토큰 만료 시간 = ${expiration}, 현재 시간 = ${currentTime}`);

  if (expiration - currentTime < 5 * 60 * 1000) {
    console.log(`[DEBUG] checkAndRefreshToken: accessToken이 곧 만료됨. 갱신 시작`);
    const refreshedData = await refreshToken();
    return refreshedData.access;
  }

  console.log(`[DEBUG] checkAndRefreshToken: accessToken 유효. 기존 토큰 사용`);
  return accessToken;
};