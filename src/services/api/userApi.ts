import { ProfileData, UserData } from '../types/userData';
import { fetchWithToken } from '../utils/clientUtils';

export const userApi = {
  // 사용자 프로필 정보 가져오기
  getUserProfile: async (): Promise<UserData> => {
    const response = await fetchWithToken('http://localhost:8000/users/me/', 'GET');
    return response;
  },

  // 사용자 프로필 업데이트
  updateUserProfile: async (profileData: ProfileData): Promise<ProfileData> => {
    const response = await fetchWithToken('http://localhost:8000/users/me/', 'PATCH', profileData);
    return response;
  },
};
