// Cube.js
import { useEffect } from 'react';
import * as THREE from 'three';
import { useThree } from '../ThreeJSManager';

const Cube = ({ width, height, depth, color, opacity, isVisible, position }) => {
  const setup = (context) => {
    const { scene } = context;
    const cubeGeometry = new THREE.BoxGeometry(width, height, depth);
    const cubeMaterial = new THREE.MeshBasicMaterial({
      color,
      opacity: isVisible ? 0.8 : 0,
      transparent: true,
    });
 // Inside the setup function for the outer cube in Cube.js
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.copy(new THREE.Vector3(...position));
cube.renderOrder = 0; // Set the rendering order
scene.add(cube);


    return cube;
  };

  const { getEntity } = useThree(setup);

  useEffect(() => {
    const cube = getEntity();
    cube.material.color.setHex(color);
    cube.material.opacity = opacity;
  }, [color, getEntity, opacity]);

  return null;
};

export default Cube;
