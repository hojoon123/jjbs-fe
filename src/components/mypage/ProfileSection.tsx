'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RootState } from '@/redux/store';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { EmailModal } from './profile/EmailModal';
import { PasswordModal } from './profile/PasswordModal';

export function ProfileSection() {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const user = useSelector((state: RootState) => state.user);

  const getSubscriptionColor = (plan: string) => {
    switch (plan) {
      case 'free':
        return 'bg-gray-200 text-gray-700';
      case 'basic':
        return 'bg-blue-200 text-blue-700';
      case 'pro':
        return 'bg-purple-200 text-purple-700';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>프로필</CardTitle>
        <CardDescription>개인 정보 관리</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>이름</Label>
          <div className="font-medium">{user.first_name}{user.last_name}</div>
        </div>
        <div className="space-y-2">
          <Label>이메일</Label>
          <div className="font-medium">{user.email}</div>
          <Button 
            variant="link" 
            className="p-0 h-auto font-normal text-blue-600"
            onClick={() => setShowEmailModal(true)}
          >
            이메일 변경
          </Button>
        </div>
        <div className="space-y-2">
          <Label>비밀번호</Label>
          <div>
            <Button 
              variant="link" 
              className="p-0 h-auto font-normal text-blue-600"
              onClick={() => setShowPasswordModal(true)}
            >
              비밀번호 변경
            </Button>
          </div>
        </div>
        <div className="pt-2">
          <Badge className={getSubscriptionColor(user.userprofile?.subscription_plan || 'free')}>
            {(user.userprofile?.subscription_plan || 'free').toUpperCase()}
          </Badge>
        </div>
      </CardContent>

      <EmailModal 
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        currentEmail={user.email || ''}
      />
      <PasswordModal 
        isOpen={showPasswordModal} 
        onClose={() => setShowPasswordModal(false)} 
      />
    </Card>
  );
}