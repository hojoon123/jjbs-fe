import { ProfileData, UserData } from '../types/userData';
import { fetchWithToken } from '../utils/clientUtils';
import { BASE_URL } from '../utils/constants';
import { fetchGetToken } from '../utils/serverUtils';

export const userApi = {
  // 사용자 프로필 정보 가져오기
  loginGetUserProfile: async (): Promise<UserData> => {
    const response = await fetchWithToken(`${BASE_URL}/users/me/`, 'GET');
    return response;
  },

  getUserProfile: async (): Promise<UserData> => {
    const response = await fetchGetToken(`${BASE_URL}/users/me/`, 'GET');
    return response;
  },

  // 사용자 프로필 업데이트
  updateUserProfile: async (profileData: ProfileData): Promise<ProfileData> => {
    const response = await fetchWithToken(`${BASE_URL}/users/me/`, 'PATCH', profileData);
    return response;
  },
};
