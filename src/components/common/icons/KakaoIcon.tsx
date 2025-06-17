'use client';

import { SVGProps } from 'react';
import KakaoSvg from '@/public/assets/icons/login-kakao.svg';

interface KakaoLoginIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

export default function KakaoLoginIcon({
  className = '',
  size = 24,
  ...props
}: KakaoLoginIconProps) {
  return <KakaoSvg className={className} width={size} height={size} {...props} />;
}
