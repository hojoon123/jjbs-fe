import { EditProfileForm } from '@/components/mypage/profile/EditProfileForm'
import { User } from 'lucide-react'

export default function EditProfilePage() {
  // 이 부분은 실제로는 서버에서 데이터를 가져와야 합니다.
  const userData = {
    name: '홍길동',
    email: 'hong@example.com'
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <User className="mr-2" />
        프로필 수정
      </h1>
      <EditProfileForm initialName={userData.name} initialEmail={userData.email} />
    </div>
  )
}