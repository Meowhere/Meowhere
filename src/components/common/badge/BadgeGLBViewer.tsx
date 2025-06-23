'use client';

import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import BadgeEnvironment from './BadgeEnvironment';

const Badge3DModel = dynamic(() => import('./Badge3DModel'), { ssr: false });

interface Props {
  glbPath: string;
}

export default function BadgeGLBViewer({ glbPath }: Props) {
  return (
    <div className='w-[180px] h-[180px]'>
      <Canvas
        shadows={{ enabled: true }}
        camera={{ position: [1.3, 0, 0], fov: 50, near: 0.1, far: 1000 }}
        style={{ background: '#fff', filter: 'contrast(1.1) saturate(1.2)' }}
        gl={{ alpha: false, antialias: false }}
        onCreated={({ gl }) => gl.setClearColor('#ffffff', 1)}
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
