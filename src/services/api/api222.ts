const BASE_URL = 'http://localhost:8000';

// 서버에서 쿠키를 가져오는 함수
const getToken = (tokenName: string) => {
  if (typeof window === 'undefined') {
    const cookies = require('next/headers').cookies;
    return cookies().get(tokenName)?.value;
  }
  return null; // 클라이언트에서는 쿠키에 직접 접근할 수 없음
};

// accessToken 재발급 API
const refreshToken = async () => {
  const refreshToken = getToken('refreshToken');
  const response = await fetch(`${BASE_URL}/users/token/refresh/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh: refreshToken }),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to refresh access token');
  }

  const data = await response.json();
  return data;
};

// accessToken 만료 시간 체크 및 토큰 갱신 함수
const checkAndRefreshToken = async () => {
  const accessToken = getToken('accessToken');
  const refreshToken = getToken('refreshToken');

  // accessToken이 없으면 refreshToken으로 바로 재발급 시도
  if (!accessToken) {
    if (!refreshToken) {
      // refreshToken도 없으면 로그인 페이지로 리다이렉트 등 추가 처리
      return;
    }
    // refreshToken을 이용해 accessToken 갱신
    const refreshedData = await refreshToken();
    return refreshedData.access;
  }

  // accessToken이 존재할 경우, 만료 시간 체크
  const tokenPayload = JSON.parse(atob(accessToken.split('.')[1]));
  const expiration = tokenPayload.exp * 1000;
  const currentTime = Date.now();

  // 만료 5분 전에 accessToken 갱신
  if (expiration - currentTime < 5 * 60 * 1000) { 
    const refreshedData = await refreshToken();
    return refreshedData.access;
  }

  return accessToken; // 아직 유효한 accessToken 반환
};

// 공통 fetchWithToken 함수
const fetchWithToken = async (url: string, method: string, body?: any) => {
  await checkAndRefreshToken(); // 미리 토큰 체크 및 갱신

  const accessToken = getToken('accessToken');
  const options: RequestInit = {
    method,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: body ? JSON.stringify(body) : null,
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status}`);
  }

  return response;
};


// API 요청 함수들
export const api = {
  // 로그인 API
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
      throw new Error('Login failed');
    }

    const data = await response.json();
    return data;
  },

  // 로그아웃 API
  logout: async () => {
    const accessToken = getToken('accessToken');
    const response = await fetch(`${BASE_URL}/users/logout/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }

    return response.json();
  },

  // 회원가입 API
  register: async (userData: {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
  }) => {
    const response = await fetch(`${BASE_URL}/users/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    return response.json();
  },

  // 유저 프로필 가져오기 API
  getUserProfile: async () => {
    const response = await fetchWithToken(`${BASE_URL}/users/me/`, 'GET');
    return response.json();
  },

  // 유저 프로필 업데이트 API
  updateUserProfile: async (userData: {
    first_name?: string;
    last_name?: string;
    username?: string;
    email?: string;
    userprofile?: {
      subscription_plan?: string;
    };
  }) => {
    const response = await fetchWithToken(`${BASE_URL}/users/me/`, 'PATCH', userData);
    return response.json();
  },
};