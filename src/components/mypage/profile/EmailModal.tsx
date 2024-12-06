'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from 'react';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentEmail: string;
}

export function EmailModal({ isOpen, onClose, currentEmail }: EmailModalProps) {
  const [email, setEmail] = useState(currentEmail);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 이메일 변경 로직 추가
    console.log('이메일 변경 요청:', email);
    alert("이메일 변경 요청이 전송되었습니다. 새 이메일로 확인 링크를 보냈습니다.");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>이메일 변경</DialogTitle>
          <DialogDescription>
            새로운 이메일 주소를 입력해주세요. 변경 후 확인 이메일을 보내드립니다.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">새 이메일</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit">변경 요청</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}