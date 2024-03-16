// CubeControls.js
import { useControls } from 'leva';

export const useCubeControls = (cubeId, position) => {
  return useControls(
    `${cubeId} Controls`,
    {
      visibility: { value: true, label: 'Visible' },
      color: { value: '#000', label: 'Color' },
      height: { value: 1.2, min: 0, max: 5, label: 'Height', step: 0.01 },
      width: { value: 2.5, min: 0, max: 5, label: 'Width', step: 0.1 },
      depth: { value: 2, min: 0, max: 5, label: 'Depth', step: 0.1 },
      positionX: { value: position[0], min: -5, max: 5, label: 'X-Position', step: 0.001 },
      positionY: { value: position[1], min: -5, max: 5, label: 'Y-Position', step: 0.001 },
      positionZ: { value: position[2], min: -5, max: 5, label: 'Z-Position', step: 0.100 },
      wireframe: { value: true, label: 'Wireframe' },
      opacity: { value: 0.4, min: 0, max: 1, label: 'Opacity', step: 0.01 },
    },
    { collapsed: true }
  );
};
