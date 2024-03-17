import { useControls } from 'leva';

export const useSectionControls = (sectionIndex) => {
  return useControls(
    `Section ${sectionIndex + 1} Controls`,
    {
      outerBoxControls: {
        visibility: { value: true, label: 'Visible' },
        opacity: { value: 0.3, min: 0, max: 1.1, label: 'Opacity', step: 0.001 },
        wireframe: { value: false, label: 'Wireframe' },
        width: { value: 3.0, min: 0, max: 10, label: 'Width', step: 0.001 },
        height: { value: 7.5, min: 0, max: 10, label: 'Height', step: 0.001 },
        depth: { value: 2.6, min: 0, max: 10, label: 'Depth', step: 0.001 },
        positionX: { value: 0, min: -10, max: 10, label: 'X-Position', step: 0.001 },
        positionY: { value: -0.5, min: -10, max: 10, label: 'Y-Position', step: 0.001 },
        positionZ: { value: -0.1, min: -10, max: 10, label: 'Z-Position', step: 0.001 },
        showGrid: { value: true, label: 'Show Grid' },
        color: { value: 'black', label: 'Frame Color' },
      },
      gridControls: {
        gridColor: { value: 0x000000, label: 'Grid Color' },
        gridBackgroundColor: { value: 'teal', label: 'Grid Background Color' },
        gridPositionX: { value: 0, min: -10, max: 10, label: 'Grid X-Position', step: 0.1 },
        gridPositionY: { value: -4.2, min: -10, max: 10, label: 'Grid Y-Position', step: 0.1 },
        gridPositionZ: { value: 0, min: -10, max: 10, label: 'Grid Z-Position', step: 0.1 },
      },
      busbarControls: {
        color: { value: '#B87333', label: 'Color' },
        thickness: { value: 0.4, min: 0, max: 1, label: 'Thickness', step: 0.1 },
      },
      verticalRailControls: {
        color: { value: '#7b7b7b', label: 'Color' },
        thickness: { value: 0.3, min: 0, max: 1, label: 'Thickness', step: 0.1 },
      },
    },
    { collapsed: true }
  );
};
