import { fetchWithToken } from '../utils/utils';

export const authApi = {
  login: async (username: string, password: string) => {
    const response = await fetch('http://localhost:8000/users/login/', {
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
    return await fetchWithToken('http://localhost:8000/users/logout/', 'POST');
  }
};
