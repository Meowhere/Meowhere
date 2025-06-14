import { Metadata } from 'next';
import '@/src/styles/globals.css';
import localFont from 'next/font/local';
import ClientLayout from './client-layout';
import ModalProvider from '@/src/components/providers/ModalProvider';
import Toast from '../components/common/toast/Toast';

export const metadata: Metadata = {
  title: '어디가냥',
  description: '이번 주말에 어디가냥',
  icons: {
    icon: '/assets/icons/ico-fav.svg',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
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
    <html lang='ko' className={`${pretendard.className} bg-white dark:bg-black`}>
      <body className='bg-white dark:bg-black'>
        <ClientLayout>
          {children}
          <ModalProvider />
          <Toast />
        </ClientLayout>
        {/* <ModalProvider /> */}
      </body>
    </html>
  );
}
