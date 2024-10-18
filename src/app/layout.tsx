import { ReduxProvider } from '@/components/ReduxProvider'; // 클라이언트 컴포넌트로 불러옴
import { Metadata } from 'next';
import ClientLayout from '../components/ClientLayout';
import Header from '../components/Header';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'JUNJUN',
  description: 'JUNJUN 온라인 쇼핑몰',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        {/* ReduxProvider로 클라이언트 상태 관리 */}
        <ReduxProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <ClientLayout>{children}</ClientLayout>
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
