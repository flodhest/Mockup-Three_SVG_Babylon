import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import Section3D from './Section3D';

const AssemblyScene = () => {
  const sectionRef = useRef();

  // Custom animation for the 3D model
  useFrame(() => {
    sectionRef.current.rotation.y += 0.005; // Rotate the model continuously
  });

  // Function to handle rotation on button click
  const rotateModel = () => {
    const newRotation = sectionRef.current.rotation.y + Math.PI / 2;
    sectionRef.current.rotation.y = newRotation;
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <Canvas style={{ background: '#f0f0f0' }} camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />

        <Suspense fallback={null}>
          <Section3D ref={sectionRef} onClick={rotateModel} isHovered={false} />
        </Suspense>

        <OrbitControls />
        <Stars />
      </Canvas>
    </div>
  );
};

export default AssemblyScene;
