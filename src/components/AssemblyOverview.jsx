import React, {  useState, useRef, useEffect } from 'react';
import { Flex, Box, Button, Icon, IconButton, useDisclosure } from '@chakra-ui/react';
import { Canvas } from '@react-three/fiber';
import { Stats, OrbitControls } from '@react-three/drei';
import { ChevronLeftIcon, ChevronRightIcon,  EditIcon } from '@chakra-ui/icons';
import Cube from './Cube';

// import { OBJExporter } from 'three/examples/jsm/exporters/OBJExporter.js';
// import { saveAs } from 'file-saver'; // Import file-saver to save OBJ file


const AssemblyOverview = ({ sections, setSections }) => {
  const sceneRef = useRef();
  const [sectionRefs, setSectionRefs] = useState([]);
  const { isOpen, onToggle } = useDisclosure();

  useEffect(() => {
    setSectionRefs(Array(sections.length).fill(null).map(() => React.createRef()));
  }, [sections]);

  const rotateSection = (index, rotationStep) => {
    const updatedSections = [...sections];
    updatedSections[index].rotation = (updatedSections[index].rotation + rotationStep) % 360;
    setSections(updatedSections);
  };

  // const exportToOBJ = () => {
  //   // const exporter = new OBJExporter();
  //   const result = exporter.parse(sceneRef.current);
  //   const blob = new Blob([result], { type: 'text/plain' });
  //   saveAs(blob, 'scene.obj');
  // };

  return (
    <Flex position="relative" justifyContent="center" alignItems="center">
      {sections.map((section, sectionIndex) => (
        <Box key={sectionIndex} border="1px solid black" p={4} m={2} borderRadius="md" position="relative">
          <Canvas camera={{ position: [0, 0, 7] }} style={{ width: '200px', height: '450px' }}>
            <group ref={sceneRef}>
              <group rotation={[0, (section.rotation * Math.PI) / 180, 0]} ref={sectionRefs[sectionIndex]}>
                {/* Rendering Cube components */}
                <Cube position={[0, 2.4, 0]} isSelected={false} />
                <Cube position={[0, 1, 0]} isSelected={false} />
                <Cube position={[0, -0.3, 0]} isSelected={false} />
                <Cube position={[0, -1.6, 0]} isSelected={false} />
                <Cube position={[0, -3.2, 0]} isSelected={false} />
              </group>
            </group>
            <OrbitControls />
            <Stats />
          </Canvas>
          <Box position="absolute" top="0" left="50%" transform="translateX(-50%)" textAlign="center" width="100%" zIndex="2">
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
          {/* Small button to show/hide section controls */}
          <IconButton
            aria-label="Toggle Section Controls"
            icon={<EditIcon />}
            onClick={onToggle}
            position="absolute"
            top="0"
            right="0"
            size="sm"
            variant="ghost"
            colorScheme="blue"
            zIndex="3"
          />
          {isOpen && (
            <Box position="absolute" top="2.5rem" right="0" p={4} bgColor="white" border="1px solid black" borderRadius="md" zIndex="2">
              {/* Add controls for frame, busbar, rails, and grid */}
              {/* <Button onClick={exportToOBJ} colorScheme="blue" variant="ghost" size="sm" mb={2}>
                Export OBJ
              </Button> */}
            </Box>
          )}
        </Box>
      ))}
    </Flex>
  );
};

export default AssemblyOverview;
