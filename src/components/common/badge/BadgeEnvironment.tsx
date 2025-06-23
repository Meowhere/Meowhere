'use client';

export default function BadgeEnvironment() {
  return (
    <>
      <ambientLight intensity={6.0} color='#ffffff' />
      <directionalLight
        position={[5, 5, 5]}
        intensity={5.0}
        color='#ffffff'
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <directionalLight position={[-3, 3, 2]} intensity={3.5} color='#ffffff' castShadow />
      <pointLight position={[0, 3, 3]} intensity={4.0} color='#ffffff' castShadow />
      <pointLight position={[0, -2, 0]} intensity={2.5} color='#ffffff' />
    </>
  );
}
