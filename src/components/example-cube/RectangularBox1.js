// RectangularBox1.js
import  { useEffect } from 'react';
import * as THREE from 'three';
import { useThree } from '../ThreeJSManager/';

const RectangularBox1 = ({ position, isVisible, toggleVisibility, width, height, depth, color }) => {
  const setup = (context) => {
    const { scene } = context;
    const boxGeometry = new THREE.BoxGeometry(width, height, depth);
    const boxMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: isVisible ? 0.5 : 0, // Set initial opacity based on visibility
    });

    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.position.copy(new THREE.Vector3(...position));
    box.renderOrder = -1; // Set the rendering order

    scene.add(box);

    return box;
  };

  const { getEntity } = useThree(setup);

  useEffect(() => {
    const box = getEntity();
    box.material.opacity = isVisible ? 0.5 : 0;
  }, [getEntity, isVisible]);

  return null; // Removed the checkbox UI
};

export default RectangularBox1;
