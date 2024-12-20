import { UserData } from '../types/userData';
import { fetchWithToken } from '../utils/clientUtils';
import { BASE_URL } from '../utils/constants';

export const userApi = {
  // 사용자 프로필 정보 가져오기
  getUserProfile: async (): Promise<UserData> => {
    const response = await fetchWithToken(`${BASE_URL}/users/me/`, 'GET');
    return response;
  },
};
