// Import necessary modules and components
import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import Section3D from '../components/Section3D';

// Define the AssemblyScene component
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
      {/* Create a Canvas for the 3D scene */}
      <Canvas style={{ background: '#f0f0f0' }} camera={{ position: [0, 0, 5] }}>
        {/* Add ambient light and a spot light */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />

        {/* Use Suspense for loading states (fallback set to null) */}
        <Suspense fallback={null}>
          {/* Render the Section3D component */}
          <Section3D ref={sectionRef} onClick={rotateModel} isHovered={false} size={100} />
        </Suspense>

        {/* Add OrbitControls for navigation */}
        <OrbitControls />

        {/* Add a starry background */}
        <Stars />
      </Canvas>
    </div>
  );
};

// Export the AssemblyScene component
export default AssemblyScene;
