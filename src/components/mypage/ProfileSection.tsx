import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';

interface ProfileSectionProps {
  name: string;
  email: string;
}

export function ProfileSection({ name, email }: ProfileSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">

          프로필
        </CardTitle>
        <CardDescription>개인 정보 관리</CardDescription>
      </CardHeader>
      <CardContent>
        <p><strong>이름:</strong> {name}</p>
        <p><strong>이메일:</strong> {email}</p>
        <Link href="/users/profile/edit">
          <Button className="mt-4">프로필 수정</Button>
        </Link>
      </CardContent>
    </Card>
  )
}