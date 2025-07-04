'use client';

import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import BadgeEnvironment from './BadgeEnvironment';
import { useThemeStore } from '@/src/store/themeStore';

const Badge3DModel = dynamic(() => import('./Badge3DModel'), { ssr: false });

interface Props {
  glbPath: string;
}

export default function BadgeGLBViewer({ glbPath }: Props) {
  const theme = useThemeStore((state) => state.theme);
  const isDarkMode = theme === 'dark';

  const backgroundColor = isDarkMode ? '#38322D' : '#ffffff'; // 다크모드: #38322D, 라이트모드: white
  const clearColor = isDarkMode ? '#38322D' : '#ffffff';

  return (
    <div className='w-[180px] h-[180px]'>
      <Canvas
        shadows={{ enabled: true }}
        camera={{ position: [1.3, 0, 0], fov: 50, near: 0.1, far: 1000 }}
        style={{
          background: backgroundColor,
          filter: !isDarkMode ? 'contrast(1.1) saturate(1.2)' : 'contrast(1.0) saturate(1.0)',
        }}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl }) => gl.setClearColor(clearColor, 1)}
      >
        <Suspense fallback={null}>
          <Badge3DModel badgeFile={glbPath} />
          <BadgeEnvironment />
          <Environment preset='city' environmentIntensity={3.0} />
        </Suspense>
      </Canvas>
    </div>
  );
}
