import { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import ReactQueryProvider from '../lib/react-query/ReactQueryProvider';
import ModalProvider from '@/src/components/providers/ModalProvider';

export const metadata: Metadata = {
  title: '어디가냥',
  description: '이번 주말에 어디가냥',
  icons: {
    icon: '/assets/icons/ico-fav.svg',
  },
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
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <ModalProvider />
      </body>
    </html>
  );
}
