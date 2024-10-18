import { ProfileData, UserData } from '../types/userData';
import { fetchWithToken } from '../utils/clientUtils';

const BASE_URL = 'https://3618-61-84-218-100.ngrok-free.app';
export const userApi = {
  // 사용자 프로필 정보 가져오기
  getUserProfile: async (): Promise<UserData> => {
    const response = await fetchWithToken(`${BASE_URL}/users/me/`, 'GET');
    return response;
  },

  // 사용자 프로필 업데이트
  updateUserProfile: async (profileData: ProfileData): Promise<ProfileData> => {
    const response = await fetchWithToken(`${BASE_URL}/users/me/`, 'PATCH', profileData);
    return response;
  },
};
