// src/components/Section3D.js
import React, { useRef, useState } from 'react';
import { extend, Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Import the necessary three.js components
import { BoxGeometry } from 'three';

extend({ BoxGeometry, OrbitControls });

const Cube = ({ width, height, depth, transparent = false, color = 0xffffff, outlineColor = 0x000000, onClick, rotation, scale = 0.05 }) => {
  const meshRef = useRef();
  const [isHovered, setHover] = useState(false);

  useFrame(() => {
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <mesh
      ref={meshRef}
      position={[0, -height / 2 * scale, 0]}
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

const Controls = () => {
  const { camera, gl } = useThree();
  const controlsRef = useRef();

  useFrame(() => {
    controlsRef.current.update();
  });

  return <orbitControls ref={controlsRef} args={[camera, gl.domElement]} />;
};

const Section3D = ({ width, height, depth, transparent, color, outlineColor, onClick, rotation, scale }) => {
  return (
    <Canvas style={{ width: '100%', height: '100%' }}>
      <Cube
        width={width}
        height={height}
        depth={depth}
        transparent={transparent}
        color={color}
        outlineColor={outlineColor}
        onClick={onClick}
        rotation={rotation}
        scale={scale}
      />
      <Controls />
    </Canvas>
  );
};

export default Section3D;
