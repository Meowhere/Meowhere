import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: '어디가냥',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  );
}
