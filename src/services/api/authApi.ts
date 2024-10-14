export const authApi = {
  login: async (username: string, password: string) => {
    const response = await fetch('https://5138-222-102-164-25.ngrok-free.app/users/login/', {
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
    const response = await fetch('https://5138-222-102-164-25.ngrok-free.app/users/logout/', {
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
