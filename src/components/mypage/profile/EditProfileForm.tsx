'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from 'react'

interface EditProfileFormProps {
  initialName: string;
  initialEmail: string;
}

export function EditProfileForm({ initialName, initialEmail }: EditProfileFormProps) {
  const [name, setName] = useState(initialName)
  const [email, setEmail] = useState(initialEmail)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 여기에 프로필 업데이트 로직 추가
    console.log('Profile updated:', { name, email })
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <Label htmlFor="name">이름</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1"
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="email">이메일</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1"
        />
      </div>
      <Button type="submit" className="w-full">저장</Button>
    </form>
  )
}