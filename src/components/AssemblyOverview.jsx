import React, { useMemo, useState } from 'react';
import { Flex, Box, Button, Icon } from '@chakra-ui/react';
import { Canvas } from '@react-three/fiber';
import { Stats, OrbitControls } from '@react-three/drei';
import { ChevronLeftIcon, ChevronRightIcon, DownloadIcon  } from '@chakra-ui/icons';
import { useAssemblyControls } from './AssemblyControls';
import Cube from './Cube';
import SectionPlaceholder from './SectionPlaceholder';
import * as THREE from 'three';
import { GLTFExporter } from './exporters/GLTFExporter';

const AssemblyOverview = ({ sections, setSections }) => {
  const sceneRef = React.useRef();
  const { outerBoxControls, gridControls, busbarControls, verticalRailControls } = useAssemblyControls();
  const exporter = new GLTFExporter();

  const [sectionRefs, setSectionRefs] = useState([]);

  React.useEffect(() => {
    setSectionRefs(Array(sections.length).fill(null).map(() => React.createRef()));
  }, [sections]);

  const rotateSection = (index, rotationStep) => {
    const updatedSections = [...sections];
    updatedSections[index].rotation = (updatedSections[index].rotation + rotationStep) % 360;
    setSections(updatedSections);
  };

  const placeholderWidth = 200;
  const placeholderHeight = 450;

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

  const exportToGLTF = async (sectionIndex) => {
    console.log(`Exporting section ${sectionIndex + 1} to GLTF`);
    const selectedSection = sections[sectionIndex];
    
    if (!selectedSection || !sectionRefs[sectionIndex] || !sectionRefs[sectionIndex].current) {
      console.error(`Section ${sectionIndex + 1} reference is not properly set.`);
      return;
    }

    const { title } = selectedSection;
    const sectionScene = new THREE.Scene();
    
    sectionRefs[sectionIndex].current.traverse((child) => {
      const clone = child.clone();

      if (clone instanceof THREE.Mesh) {
        const geometry = clone.geometry.clone();
        let material;

        if (clone.material instanceof THREE.MeshBasicMaterial) {
          material = new THREE.MeshStandardMaterial({ color: clone.material.color });
        } else {
          material = clone.material.clone();
        }

        clone.geometry = geometry;
        clone.material = material;
      }

      sectionScene.add(clone);
    });

    return new Promise((resolve, reject) => {
      exporter.parse(sectionScene, (gltf) => {
        const gltfString = JSON.stringify(gltf);
        const blob = new Blob([gltfString], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.style.display = 'none';
        link.href = url;
        link.download = `section_${title}.gltf`;
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(link);
        resolve();
      });
    });
  };

  const convertToDXF = async (gltfFile) => {
    try {
      const response = await fetch('/api/convert-gltf-to-dxf', {
        method: 'POST',
        body: gltfFile,
        headers: {
          'Content-Type': 'application/octet-stream'
        }
      });
  
      if (!response.ok) {
        console.error('Failed to convert GLTF to DXF');
        return;
      }
  
      const dxfBlob = await response.blob();
      const dxfUrl = URL.createObjectURL(dxfBlob);
      const dxfLink = document.createElement('a');
      dxfLink.style.display = 'none';
      dxfLink.href = dxfUrl;
      dxfLink.download = 'model.dxf';
      document.body.appendChild(dxfLink);
      dxfLink.click();
      URL.revokeObjectURL(dxfUrl);
      document.body.removeChild(dxfLink);
    } catch (error) {
      console.error('Error converting GLTF to DXF:', error);
    }
  };
  

  return (
    <Flex position="relative" justifyContent="center" alignItems="center">
      {sections.map((section, sectionIndex) => (
        <Box key={sectionIndex} border="1px solid black" p={4} m={2} borderRadius="md" position="relative">
          <Canvas camera={{ position: [0, 0, 7] }} style={{ width: `${placeholderWidth}px`, height: `${placeholderHeight}px` }}>
            <group ref={sceneRef}>
              {outerBoxControls.showGrid && (
                <primitive object={new THREE.GridHelper(10, 10, gridControls.gridColor, gridControls.gridBackgroundColor)} position={[gridControls.gridPositionX, gridControls.gridPositionY, gridControls.gridPositionZ]} />
              )}
              <group rotation={[0, (section.rotation * Math.PI) / 180, 0]} ref={sectionRefs[sectionIndex]}>
                <mesh visible={outerBoxControls.visibility} position={[outerBoxControls.positionX, outerBoxControls.positionY, outerBoxControls.positionZ]} key="outerBox">
                  <boxGeometry args={[outerBoxControls.width, outerBoxControls.height, outerBoxControls.depth]} />
                  <meshBasicMaterial transparent opacity={outerBoxControls.opacity} wireframe={outerBoxControls.wireframe} color={new THREE.Color(outerBoxControls.color)} depthTest={false} />
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
            leftIcon={<DownloadIcon />} // Add the DownloadIcon to the button
            onClick={async () => {
              await exportToGLTF(sectionIndex);
              // Once the GLTF is exported, convert it to DXF
              const gltfFile = await fetch(`/section_${sections[sectionIndex].title}.gltf`).then(response => response.blob());
              convertToDXF(gltfFile);
            }}
            colorScheme="blue"
            variant="ghost"
            size="sm"
          >
            Export Section {sectionIndex + 1} to DXF
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
