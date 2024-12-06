'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { EmailModal } from './profile/EmailModal';
import { PasswordModal } from './profile/PasswordModal';

export function ProfileSection() {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user.isAuthenticated) {
      router.push('/users/login');
    }
  }, [user.isAuthenticated, router]);

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
    <div className="max-w-6xl mx-auto p-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-full md:col-span-1">
        <CardHeader>
          <CardTitle>프로필</CardTitle>
          <CardDescription>개인 정보를 관리하고 업데이트하세요</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>이름</Label>
            <div className="font-medium">{user.first_name} {user.last_name}</div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              value={user.email}
              readOnly
            />
          </div>
          <div className="pt-2">
            <Badge className={getSubscriptionColor(user.userprofile?.subscription_plan || 'free')}>
              {(user.userprofile?.subscription_plan || 'free').toUpperCase()}
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="flex gap-4">
          <Button onClick={() => setShowEmailModal(true)}>이메일 변경</Button>
          <Button variant="outline" onClick={() => setShowPasswordModal(true)}>
            비밀번호 변경
          </Button>
        </CardFooter>
      </Card>

      <EmailModal 
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        currentEmail={user.email || ""}
      />
      <PasswordModal 
        isOpen={showPasswordModal} 
        onClose={() => setShowPasswordModal(false)} 
      />
    </div>
  );
}
