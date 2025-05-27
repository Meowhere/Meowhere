import { Metadata } from 'next';
import localFont from 'next/font/local';
import ReactQueryProvider from '../lib/react-query/ReactQueryProvider';

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
    <html lang="ko" className={pretendard.className}>
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
