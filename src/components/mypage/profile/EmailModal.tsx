import { useState } from 'react';

interface EmailModalProps {
  closeModal: () => void;
}

export function EmailModal({ closeModal }: EmailModalProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 이메일 인증 로직 추가
    closeModal();
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">새 이메일</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">변경</button>
        <button type="button" onClick={closeModal}>취소</button>
      </form>
    </div>
  );
}
