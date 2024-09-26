'use client'

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useState } from 'react'

interface UserSettingsProps {
  initialEmailNotifications: boolean;
  initialSmsNotifications: boolean;
  initialDarkMode: boolean;
}

export function UserSettings({ initialEmailNotifications, initialSmsNotifications, initialDarkMode }: UserSettingsProps) {
  const [emailNotifications, setEmailNotifications] = useState(initialEmailNotifications)
  const [smsNotifications, setSmsNotifications] = useState(initialSmsNotifications)
  const [darkMode, setDarkMode] = useState(initialDarkMode)

  const handleSave = () => {
    // 여기에 설정 저장 로직 추가
    console.log('Settings saved:', { emailNotifications, smsNotifications, darkMode })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Label htmlFor="email-notifications" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          이메일 알림
        </Label>
        <Switch
          id="email-notifications"
          checked={emailNotifications}
          onCheckedChange={setEmailNotifications}
        />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="sms-notifications" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          SMS 알림
        </Label>
        <Switch
          id="sms-notifications"
          checked={smsNotifications}
          onCheckedChange={setSmsNotifications}
        />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="dark-mode" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          다크 모드
        </Label>
        <Switch
          id="dark-mode"
          checked={darkMode}
          onCheckedChange={setDarkMode}
        />
      </div>
      <Button className="w-full" onClick={handleSave}>설정 저장</Button>
    </div>
  )
}