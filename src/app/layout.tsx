import type { Metadata } from "next";
import ClientLayout from '../components/ClientLayout';
import Header from '../components/Header';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'JUNJUN',
  description: 'JUNJUN 온라인 쇼핑몰',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <div className="flex flex-col min-h-screen">
          <Header />
          <ClientLayout>
            {children}
          </ClientLayout>
        </div>
      </body>
    </html>
  )
}