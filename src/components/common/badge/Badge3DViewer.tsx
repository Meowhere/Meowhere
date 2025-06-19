'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Environment, useGLTF } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

// GLB 파일 사전 로딩
useGLTF.preload('/assets/badge/badge.glb');

function BadgeModel() {
  const { scene } = useGLTF('/assets/badge/badge.glb');
  const meshRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.8; // 부드러운 회전
    }
  });

  return <primitive object={scene} ref={meshRef} />;
}

export default function Badge3DViewer() {
  return (
    <div className='w-[200px] h-[200px]'>
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 3] }} shadows>
        <ambientLight intensity={1.2} />
        <directionalLight position={[2, 2, 2]} intensity={1.5} />
        <Suspense
          fallback={
            <Html center>
              <div className='w-6 h-6 border-4 border-t-transparent border-primary-200 rounded-full animate-spin' />
            </Html>
          }
        >
          <BadgeModel />
          <Environment preset='city' />
        </Suspense>
      </Canvas>
    </div>
  );
}
