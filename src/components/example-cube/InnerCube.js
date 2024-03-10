// InnerCube.js
import { useEffect } from 'react';
import * as THREE from 'three';
import { useThree } from '../ThreeJSManager/';

const InnerCube = ({ position, isVisible, width, height, depth }) => {
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const setup = (context) => {
    const { scene } = context;
    const cubeGeometry = new THREE.BoxGeometry(width, height, depth);
    const cubeMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(getRandomColor()),
      transparent: true,
      opacity: isVisible ? 0.5 : 0,
    });

    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.copy(new THREE.Vector3(...position));
    cube.renderOrder = -1; // Set the rendering order
    scene.add(cube);

    return cube;
  };

  const { getEntity } = useThree(setup);

  useEffect(() => {
    const cube = getEntity();
    cube.material.opacity = isVisible ? 0.8 : 0;
  }, [getEntity, isVisible]);

  return null;
};

export default InnerCube;
