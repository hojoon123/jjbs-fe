import { UserData } from '../types/userData'; // 타입을 불러옴
import { fetchWithToken } from '../utils/utils';

export const userApi = {
  // 사용자 프로필 정보 가져오기
  getUserProfile: async () => {
    const response = await fetchWithToken('http://localhost:8000/users/me/', 'GET');
    return response;
  },

  // 사용자 프로필 업데이트
  updateUserProfile: async (userData: UserData) => {
    const response = await fetchWithToken('http://localhost:8000/users/me/', 'PATCH', userData);
    return response;
  },
};
