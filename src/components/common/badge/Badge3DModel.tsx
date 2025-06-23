'use client';

import { useGLTF } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import { useEffect, useState } from 'react';

interface Props {
  badgeFile: string;
}

export default function Badge3DModel({ badgeFile }: Props) {
  const { scene } = useGLTF(badgeFile);
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

    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [hasAnimated]);

  useEffect(() => {
    scene.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          const materials = Array.isArray(child.material) ? child.material : [child.material];
          materials.forEach((material: any) => {
            if (material.color) {
              const hsl = { h: 0, s: 0, l: 0 };
              material.color.getHSL(hsl);
              material.color.setHSL(hsl.h, Math.min(hsl.s * 1.3, 1.0), hsl.l);
            }
            if (material.map && material.color) {
              const hsl = { h: 0, s: 0, l: 0 };
              material.color.getHSL(hsl);
              material.color.setHSL(hsl.h, Math.min(hsl.s * 1.8, 1.0), Math.max(hsl.l * 0.8, 0.1));
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
