// src/components/LoginForm.tsx

'use client'

import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';
import { authApi } from '../services/api/authApi';
import { userApi } from '../services/api/clientUserApi';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      const loginResponse = await authApi.login(formData.username, formData.password);
      if (!loginResponse) {
        setError('아이디 비밀번호를 확인해주세요.');
        return;
      }
      // 로그인 성공 후 유저 데이터 조회
      const userProfile = await userApi.getUserProfile();
      
      // Redux 상태 업데이트
      dispatch(setUser(userProfile));
      router.push('/');  // 로그인 성공 후 홈으로 리다이렉트
    } catch (error) {
      setError('유저 조회에 실패했습니다.');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">환영합니다</h1>
      <p className="text-center mb-6 text-gray-600">
        로그인하여 향상된 쇼핑 경험을 누려보세요.
      </p>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            아이디
          </label>
          <input
            id="username"
            name="username"
            type="text"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="relative">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            비밀번호
          </label>
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300"
        >
          로그인
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        아직 회원이 아니신가요?{' '}
        <Link href="/users/signup" className="text-black font-medium">
          회원가입
        </Link>
      </p>
    </div>
  );
}