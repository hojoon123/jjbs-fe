// src/app/users/profile/edit/page.tsx
import { EditProfileForm } from '@/components/mypage/profile/EditProfileForm'
import { User } from 'lucide-react'

export default function EditProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <User className="mr-2" />
        프로필 수정
      </h1>
      <EditProfileForm />
    </div>
  )
}