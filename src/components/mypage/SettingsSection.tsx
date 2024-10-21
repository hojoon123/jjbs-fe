'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';

export function SettingsSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">

          설정
        </CardTitle>
        <CardDescription>알림 및 보안 설정</CardDescription>
      </CardHeader>
      <CardContent>
        <Link href="/users/profile/settings">
          <Button>설정 변경</Button>
        </Link>
      </CardContent>
    </Card>
  )
}