import React, { useMemo, useState, useRef } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import { Canvas } from '@react-three/fiber';
import { Stats, OrbitControls } from '@react-three/drei';
import { useControls } from 'leva';

import * as THREE from 'three';
import Cube from './Cube';
import SectionPlaceholder from './SectionPlaceholder';
import './AssemblyOverview.css';


const AssemblyOverview = ({ sections, setSections }) => {

  const placeholderWidth = 200;
  const placeholderHeight = 500;

  const outerBoxControls = useControls(
    'Frame Controls',
    {
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
      color: { value: 'black', label: 'Frame Color' }, // Add the color prop
    },
    { collapsed: true }
  );
  
  const gridControls = useControls(
    'Grid Controls',
    {
      gridColor: { value: 0x000000, label: 'Grid Color' },
      gridBackgroundColor: { value: 'teal', label: 'Grid Background Color' },
      gridPositionX: { value: 0, min: -10, max: 10, label: 'Grid X-Position', step: 0.1 },
      gridPositionY: { value: -4.2, min: -10, max: 10, label: 'Grid Y-Position', step: 0.1 },
      gridPositionZ: { value: 0, min: -10, max: 10, label: 'Grid Z-Position', step: 0.1 },
    } ,{ collapsed: true } 
  );
  
  const busbarControls = useControls(
    'Busbar Controls',
    {
      color: { value: '#B87333', label: 'Color' },
      thickness: { value: 0.4, min: 0, max: 1, label: 'Thickness', step: 0.1 },
    } ,{ collapsed: true } 
  );

  const verticalRailControls = useControls(
    'Vertical Rail Controls',
    {
      color: { value: '#7b7b7b', label: 'Color' },
      thickness: { value: 0.3, min: 0, max: 1, label: 'Thickness', step: 0.1 },
    } ,{ collapsed: true } 
  );

  const boxes = useMemo(
    () => [
      { position: [0, 2.4, 0], name: 'Group 1', tooltip: 'Tooltip for Group 1' },
      { position: [0, 1, 0], name: 'Group 2', tooltip: 'Tooltip for Group 2' },
      { position: [0, -0.3, 0], name: 'Group 3', tooltip: 'Tooltip for Group 3' },
      { position: [0, -1.6, 0], name: 'Group 4', tooltip: 'Tooltip for Group 4' },
      { position: [0, -3.2, 0], name: 'Group 5', tooltip: 'Tooltip for Group 5' },
    ],
    []
  );

  const [selectedBoxes, setSelectedBoxes] = useState([]);



  const handleBoxClick = (box) => {
    setSelectedBoxes((prevSelected) => {
      if (prevSelected.includes(box)) {
        return prevSelected.filter((selected) => selected !== box);
      } else {
        return [...prevSelected, box];
      }
    });
  };

  const gridHelperRef = useRef();

  return (
    <Flex position="relative" justifyContent="center" alignItems="center">
    {sections.map((section, sectionIndex) => (
      <Box key={sectionIndex} border="1px solid black" p={4} m={2} borderRadius="md">
        <Canvas camera={{ position: [0, 0, 7] }} style={{ width: `${placeholderWidth}px`, height: `${placeholderHeight}px` }}>
          <group>
              {outerBoxControls.showGrid && (
                <primitive object={new THREE.GridHelper(10, 10, gridControls.gridColor, gridControls.gridBackgroundColor)} position={[gridControls.gridPositionX, gridControls.gridPositionY, gridControls.gridPositionZ]} ref={gridHelperRef} />
              )}


                <mesh
                  visible={outerBoxControls.visibility}
                  position={[outerBoxControls.positionX, outerBoxControls.positionY, outerBoxControls.positionZ]}
                  key="outerBox"
                >
                  <boxGeometry args={[outerBoxControls.width, outerBoxControls.height, outerBoxControls.depth]} />
                  <meshBasicMaterial
                    transparent
                    opacity={outerBoxControls.opacity}
                    wireframe={outerBoxControls.wireframe}
                    color={new THREE.Color(outerBoxControls.color)} // Use the Leva controls color here
                    depthTest={false}
                  />
                </mesh>


              {[0.8, 1.4, 2, 2.6].map((positionY, index) => (
                <mesh key={index} position={[0, positionY, -1.2]}>
                  <boxGeometry args={[3, busbarControls.thickness, 0.1]} />
                  <meshBasicMaterial color={busbarControls.color} />
                </mesh>
              ))}

              {[-0.4, 0.2].map((positionX, index) => (
                <mesh key={index} position={[positionX, -0.3, -1.3]}>
                  <boxGeometry args={[verticalRailControls.thickness, 6.8, 0.1]} />
                  <meshBasicMaterial color={index === 0 ? parseInt('7b7b7b', 16) : verticalRailControls.color} />
                </mesh>
              ))}

{boxes.map((box, index) => (
                <Cube
                  key={`box-${index}`}
                  position={box.position}
                  name={box.name}
                  onClick={() => handleBoxClick(box)}
                  isSelected={selectedBoxes.includes(box)}
                  opacity={0.5}
 
                  selected={selectedBoxes.includes(box)}
                />
              ))}
            </group>

            <OrbitControls />
            <Stats />
          </Canvas>
          <p>{section.title}</p>
        </Box>
      ))}
      <Box border="0px" p={2} m={2}>
        <SectionPlaceholder />
      </Box>
    </Flex>
  );
};

export default AssemblyOverview;