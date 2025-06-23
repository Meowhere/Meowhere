'use client';

import { useGLTF } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';

interface Props {
  badgeFile: string;
}

export default function Badge3DModel({ badgeFile }: Props) {
  const { scene } = useGLTF(badgeFile);
  const { gl } = useThree();
  const [hasAnimated, setHasAnimated] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { rotationY } = useSpring({
    rotationY: hasAnimated ? 0 : Math.PI,
    config: { tension: 120, friction: 14, mass: 1.2 },
  });

  const { mouseRotationZ, mouseRotationY } = useSpring({
    mouseRotationZ: hasAnimated ? mousePosition.y * 0.15 : 0,
    mouseRotationY: hasAnimated ? mousePosition.x * 0.2 : 0,
    config: { tension: 100, friction: 25, mass: 0.5 },
  });

  useEffect(() => {
    const timer = setTimeout(() => setHasAnimated(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hasAnimated) return;
    const handleMouseMove = (event: MouseEvent) => {
      const canvas = event.target as HTMLCanvasElement;
      if (!canvas || canvas.tagName !== 'CANVAS') return;
      const rect = canvas.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      setMousePosition({ x, y });
    };

    const handleMouseLeave = () => setMousePosition({ x: 0, y: 0 });

    const canvas = gl.domElement;
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasAnimated, gl]);

  useEffect(() => {
    scene.traverse((child: THREE.Object3D) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          const materials = Array.isArray(child.material) ? child.material : [child.material];
          materials.forEach((material: THREE.Material) => {
            if ((material as any).color) {
              const matWithColor = material as THREE.Material & { color: THREE.Color };
              const hsl = { h: 0, s: 0, l: 0 };
              matWithColor.color.getHSL(hsl);
              matWithColor.color.setHSL(hsl.h, Math.min(hsl.s * 1.3, 1.0), hsl.l);
            }
            if ((material as any).map && (material as any).color) {
              const matWithColor = material as THREE.Material & { color: THREE.Color; map: any };
              const hsl = { h: 0, s: 0, l: 0 };
              matWithColor.color.getHSL(hsl);
              matWithColor.color.setHSL(
                hsl.h,
                Math.min(hsl.s * 1.8, 1.0),
                Math.max(hsl.l * 0.8, 0.1)
              );
            }
            material.needsUpdate = true;
          });
        }
      }
    });
  }, [scene]);

  return (
    <animated.group
      scale={[0.5, 0.5, 0.5]}
      position={[0, 0, 0]}
      rotation-z={mouseRotationZ}
      rotation-y={rotationY.to((base) => base + mouseRotationY.get())}
    >
      <primitive object={scene} castShadow receiveShadow />
    </animated.group>
  );
}
