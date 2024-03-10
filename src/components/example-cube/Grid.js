import * as THREE from 'three';
import { useThree } from '../ThreeJSManager//';

const Grid = () => {
  useThree(({ scene }) => {
    const grid = new THREE.GridHelper(100, 20);
    grid.position.y = -80;  // Adjust the Y position of the grid
    scene.add(grid);

    return grid;
  });

  return null;
};

export default Grid;
