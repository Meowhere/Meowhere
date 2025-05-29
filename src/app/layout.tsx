import { Metadata } from 'next';
import '@/src/styles/globals.css';
import localFont from 'next/font/local';
import ClientLayout from './client-layout';
import ModalProvider from '@/src/components/providers/ModalProvider';

export const metadata: Metadata = {
  title: '어디가냥',
};

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko' className={pretendard.className}>
      <body>
        <ClientLayout>{children}</ClientLayout>
        <ModalProvider />
      </body>
    </html>
  );
}
