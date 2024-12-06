import { UserData } from '@/services/types/userData';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 초기 상태 정의
const initialState: Partial<UserData> = {
  first_name: '',
  last_name: '',
  userprofile: {
    subscription_plan: '',
  },
  email: '', // 이메일 추가
  isAuthenticated: false,
};

// 이메일 마스킹 함수
const maskEmail = (email: string): string => {
  const [localPart, domain] = email.split('@');
  const maskedLocalPart = `${localPart.slice(0, 3)}*****`;
  return `${maskedLocalPart}@${domain}`;
};

// Slice 정의
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<UserData>>) => {
      const { last_name, first_name, userprofile, email } = action.payload;
      state.first_name = first_name;
      state.last_name = last_name;
      state.userprofile = {
        ...state.userprofile,
        subscription_plan: userprofile?.subscription_plan,
      };
      state.email = email ? maskEmail(email) : ''; // 이메일 마스킹 후 저장
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.first_name = '';
      state.last_name = '';
      state.userprofile = {
        subscription_plan: '',
      };
      state.email = ''; // 이메일 초기화
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;