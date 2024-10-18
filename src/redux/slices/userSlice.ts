import { UserData } from '@/services/types/userData';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Partial<UserData> = {
  first_name: '',
  last_name: '',
  userprofile: {
    subscription_plan: '',
  },
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<UserData>>) => {
      const { first_name, last_name, userprofile } = action.payload;
      state.first_name = first_name;
      state.last_name = last_name;
      state.userprofile = {
        ...state.userprofile,
        subscription_plan: userprofile?.subscription_plan,
      };
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.first_name = '';
      state.last_name = '';
      state.userprofile = {
        subscription_plan: '',
      };
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
