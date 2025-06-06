import React from 'react';
import SubPageGNB from './components/SubPageGNB';
import MainPageGNB from './components/MainPageGNB';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  if (pathname === '/') {
    return <MainPageGNB />;
  } else {
    return <SubPageGNB />;
  }
}
