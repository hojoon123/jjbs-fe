import { UserSettings } from '@/components/mypage/settings/UserSettings'
import { Settings } from 'lucide-react'

export default function SettingsPage() {
  // 이 부분은 실제로는 서버에서 데이터를 가져와야 합니다.
  const userSettings = {
    emailNotifications: true,
    smsNotifications: false,
    darkMode: false,
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <Settings className="mr-2" />
        설정
      </h1>
      <UserSettings
        initialEmailNotifications={userSettings.emailNotifications}
        initialSmsNotifications={userSettings.smsNotifications}
        initialDarkMode={userSettings.darkMode}
      />
    </div>
  )
}