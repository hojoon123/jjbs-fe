import { PasswordChangeData, ProfileData, UserData } from '../types/userData';
import { BASE_URL } from '../utils/constants';
import { fetchGetToken } from '../utils/serverUtils';


export const userApi = {
  // 사용자 프로필 정보 가져오기
  getUserProfile: async (): Promise<UserData> => {
    const response = await fetchGetToken(`${BASE_URL}/users/me/`, 'GET');
    return response;
  },

  // 사용자 프로필 업데이트
  updateUserProfile: async (profileData: ProfileData): Promise<ProfileData> => {
    const response = await fetchGetToken(`${BASE_URL}/users/me/`, 'PATCH', profileData);
    return response;

  },
  // 비밀번호 변경
  changePassword: async (passwordData: PasswordChangeData): Promise<void> => {
    const response = await fetchGetToken(`${BASE_URL}/users/me/`, 'PATCH', passwordData);
    return response;
  },
};
