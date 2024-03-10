// src/components/Cube.js
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';

const Cube = ({ index, handleToggleVisibility, onSelectCube, isSelected }) => {
  const mesh = useRef();

  const {
    width,
    height,
    depth,
    color,
    wireframe,
    transparent,
    opacity,
    emissive,
    visibility,
  } = useControls({
    width: { value: 1, min: 0.4, max: 20, step: 0.01 },
    height: { value: 1, min: 0.4, max: 20, step: 0.01 },
    depth: { value: 1, min: 0.4, max: 20, step: 0.01 },
    color: { value: '#fff' },
    wireframe: { value: false },
    transparent: { value: true },
    opacity: { value: 1, min: 0, max: 1, step: 0.01 },
    emissive: { value: '#f87171' },
    visibility: { value: true, onChange: (value) => handleToggleVisibility(index, value) },
  });

  useFrame(() => {
    mesh.current.scale.set(width, height, depth);
  });

  const handleClick = () => {
    onSelectCube(index, {
      width,
      height,
      depth,
      color,
      wireframe,
      transparent,
      opacity,
      emissive,
      visibility,
    });
  };

  return (
    <mesh ref={mesh} onClick={handleClick} visible={visibility}>
      <boxGeometry />
      <meshPhysicalMaterial
        color={isSelected ? 'yellow' : color}
        wireframe={wireframe}
        transparent={transparent}
        opacity={opacity}
        emissive={emissive}
      />
    </mesh>
  );
};

export default Cube;
