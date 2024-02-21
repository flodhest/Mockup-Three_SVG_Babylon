// src/components/Section3D.js
import React, { useRef, useState } from 'react';
import { extend, useFrame } from '@react-three/fiber';
import { BoxGeometry } from 'three';

extend({ BoxGeometry });

const Section3D = ({ width, height, depth, transparent = false, color = 0xffffff, outlineColor = 0x000000, onClick, rotation, scale = 0.05 }) => {
  const meshRef = useRef();
  const [isHovered, setHover] = useState(false);

  useFrame(() => {
    // Set rotation and scale based on the props
    meshRef.current.rotation.x = 0;
    meshRef.current.rotation.y = rotation;
    meshRef.current.rotation.z = 0; // Ensure no rotation around Z-axis
    meshRef.current.scale.set(scale, scale, scale);
  });


  return (
    <mesh
      ref={meshRef}
      position={[0, -height / 2 * scale, 2]} // Center the section at the bottom, consider the scale
      onClick={onClick}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial attach="material" color={color} transparent={transparent} opacity={transparent ? 0.7 : 1} />
      <meshStandardMaterial attach="material" color={outlineColor} wireframe={true} />
      {isHovered && (
        <meshStandardMaterial attach="material" color={0xaaaaaa} transparent opacity={0.7} />
      )}
    </mesh>
  );
};

export default Section3D;