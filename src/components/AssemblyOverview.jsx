import React, { useRef, useState,  useMemo } from 'react';
import { Flex, Box, Button, Icon } from '@chakra-ui/react';
import { Canvas } from '@react-three/fiber';
import { Stats, OrbitControls } from '@react-three/drei';
import { ChevronLeftIcon, ChevronRightIcon, DownloadIcon } from '@chakra-ui/icons';
import { useAssemblyControls } from './AssemblyControls';
import Cube from './Cube';
import SectionPlaceholder from './SectionPlaceholder';
import * as THREE from 'three';
import { GLTFExporter } from './exporters/GLTFExporter';

const AssemblyOverview = ({ sections, setSections }) => {
  const sceneRef = useRef();
  const { outerBoxControls, gridControls, busbarControls, verticalRailControls } = useAssemblyControls();
  const [selectedBoxes, setSelectedBoxes] = useState([]);
  const rotateSection = (index, rotationStep) => {
    const updatedSections = [...sections];
    updatedSections[index].rotation = (updatedSections[index].rotation + rotationStep) % 360;
    setSections(updatedSections);
  };

  const boxes = useMemo(() => [
    { position: [0, 2.4, 0], name: 'Group 1', tooltip: 'Tooltip for Group 1' },
    { position: [0, 1, 0], name: 'Group 2', tooltip: 'Tooltip for Group 2' },
    { position: [0, -0.3, 0], name: 'Group 3', tooltip: 'Tooltip for Group 3' },
    { position: [0, -1.6, 0], name: 'Group 4', tooltip: 'Tooltip for Group 4' },
    { position: [0, -3.2, 0], name: 'Group 5', tooltip: 'Tooltip for Group 5' }
  ], []);

  const handleBoxClick = (box) => {
    setSelectedBoxes((prevSelected) => {
      if (prevSelected.includes(box)) {
        return prevSelected.filter((selected) => selected !== box);
      } else {
        return [...prevSelected, box];
      }
    });
  };

  const exportToGLTF = async (sectionIndex) => {
    console.log(`Exporting section ${sectionIndex + 1} to GLTF`);
  
    const gltfExporter = new GLTFExporter();
    const sectionScene = sceneRef.current.clone();
  
    try {
      const gltf = await gltfExporter.parse(sectionScene, (result) => {
        if (result instanceof ArrayBuffer) {
          console.error('GLB format not supported. Please set "binary" option to true.');
          return;
        }
        const gltfData = JSON.stringify(result, null, 2);
        const gltfBlob = new Blob([gltfData], { type: 'model/gltf+json' });
        const url = URL.createObjectURL(gltfBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `section_${sectionIndex + 1}.gltf`;
        link.click();
        URL.revokeObjectURL(url);
        console.log(`Export of section ${sectionIndex + 1} to GLTF completed successfully.`);
      }, {
        binary: false,
        animations: [],
        embedImages: true,
        includeCustomExtensions: true
      });
  
      // Add logic here to use the 'gltf' variable if needed
      console.log('GLTF data:', gltf);
  
    } catch (error) {
      console.error('Error exporting GLTF:', error);
      alert(`Error exporting GLTF: ${error.message}`);
    }
  };

  return (
    <Flex position="relative" justifyContent="center" alignItems="center">
      {sections.map((section, sectionIndex) => (
        <Box key={sectionIndex} border="1px solid black" p={4} m={2} borderRadius="md" position="relative">
          <Canvas camera={{ position: [0, 0, 7] }} style={{ width: '200px', height: '450px' }}>
            <group ref={sceneRef}>
              {outerBoxControls.showGrid && (
                <primitive object={new THREE.GridHelper(10, 10, gridControls.gridColor, gridControls.gridBackgroundColor)} position={[gridControls.gridPositionX, gridControls.gridPositionY, gridControls.gridPositionZ]} />
              )}
              <group rotation={[0, (section.rotation * Math.PI) / 180, 0]}>
                <mesh visible={outerBoxControls.visibility} position={[outerBoxControls.positionX, outerBoxControls.positionY, outerBoxControls.positionZ]} key="outerBox">
                  <boxGeometry args={[outerBoxControls.width, outerBoxControls.height, outerBoxControls.depth]} />
                  <meshBasicMaterial transparent opacity={outerBoxControls.opacity} wireframe={outerBoxControls.showWireframe} color={new THREE.Color(outerBoxControls.color)} depthTest={false} />
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
            </group>
            <OrbitControls />
            <Stats />
          </Canvas>
          <Box
            position="absolute"
            top="0"
            left="50%"
            transform="translateX(-50%)"
            textAlign="center"
            width="100%"
            zIndex="2"
          >
            <p style={{ margin: 0 }}>{section.title}</p>
          </Box>
          <Flex justifyContent="center">
            <Button
              onClick={() => rotateSection(sectionIndex, 90)}
              colorScheme="blue"
              variant="ghost"
              size="lg"
              leftIcon={<Icon as={ChevronLeftIcon} boxSize={6} />}
            />
            <Button
              onClick={() => rotateSection(sectionIndex, -90)}
              colorScheme="blue"
              variant="ghost"
              size="lg"
              rightIcon={<Icon as={ChevronRightIcon} boxSize={6} />}
            />
          </Flex>
          <Button
            leftIcon={<DownloadIcon />}
            onClick={async () => {
              try {
                await exportToGLTF(sectionIndex);
              } catch (error) {
                console.error('Error exporting GLTF:', error);
              }
            }}
            colorScheme="blue"
            variant="ghost"
            size="sm"
          >
            Export Section {sectionIndex + 1} to GLTF
          </Button>
          <Button
            onClick={() => outerBoxControls.setShowWireframe(!outerBoxControls.showWireframe)}
            colorScheme="blue"
            variant="ghost"
            size="sm"
            mt={2}
          >
            
          </Button>
        </Box>
      ))}
      <Box border="0px" p={2} m={2}>
        <SectionPlaceholder />
      </Box>
    </Flex>
  );
};

export default AssemblyOverview;