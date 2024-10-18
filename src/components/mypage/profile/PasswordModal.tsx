import { useState } from 'react';

interface PasswordModalProps {
  closeModal: () => void;
}

export function PasswordModal({ closeModal }: PasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 비밀번호 변경 로직 추가 (기존 비밀번호 검증 후 변경)
    if (newPassword === confirmPassword) {
      // 비밀번호 변경 요청 보내기
      closeModal();
    } else {
      alert('새로운 비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <label htmlFor="current-password">기존 비밀번호</label>
        <input
          type="password"
          id="current-password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <label htmlFor="new-password">새로운 비밀번호</label>
        <input
          type="password"
          id="new-password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <label htmlFor="confirm-password">새로운 비밀번호 확인</label>
        <input
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">변경</button>
        <button type="button" onClick={closeModal}>취소</button>
      </form>
    </div>
  );
}
