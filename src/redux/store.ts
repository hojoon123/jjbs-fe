import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './slices/userSlice';

// persist 설정
const persistConfig = {
  key: 'user',
  storage,
};

// persisted reducer 생성
const persistedUserReducer = persistReducer(persistConfig, userReducer);

// 스토어 생성
export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    // 다른 리듀서가 있다면 여기에 추가
  },
});

// RootState 타입 정의 (이 부분을 추가)
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch 타입 정의 (선택 사항)
export type AppDispatch = typeof store.dispatch;

// persistor 생성
export const persistor = persistStore(store);
