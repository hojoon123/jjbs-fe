'use client'

import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">환영합니다</h1>
      <p className="text-center mb-6 text-gray-600">
        로그인하여 향상된 쇼핑 경험을 누려보세요.
      </p>
      <form className="space-y-4">
        <div>
          <label htmlFor="email" className="sr-only">
            이메일
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="이메일"
          />
        </div>
        <div className="relative">
          <label htmlFor="password" className="sr-only">
            비밀번호
          </label>
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="비밀번호"
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
  )
}