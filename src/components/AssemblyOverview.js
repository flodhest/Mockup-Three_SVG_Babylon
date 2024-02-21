// src/components/AssemblyOverview.js
import React from 'react';
import { Flex, Box, Button } from '@chakra-ui/react';
import { Canvas } from '@react-three/fiber';
import Section3D from './Section3D';
import SectionPlaceholder from './SectionPlaceholder';
import './AssemblyOverview.css';

const AssemblyOverview = ({ sections, setSections }) => {
  const rotateSection = (index, rotationStep) => {
    const updatedSections = [...sections];
    updatedSections[index].rotation = (updatedSections[index].rotation + rotationStep) % 360;
    setSections(updatedSections);
  };

  // Assuming width and height of the SectionPlaceholder are 250px and 600px respectively
  const placeholderWidth = 250;
  const placeholderHeight = 549; // Adjusted height to match the placeholder

  return (
    <Flex position="relative" justifyContent="center" alignItems="center">
      {sections.map((section, index) => (
        <Box key={index} border="1px solid black" p={4} m={2} borderRadius="md">
          <Canvas style={{ width: `${placeholderWidth}px`, height: `${placeholderHeight}px` }}>
            <Section3D
              width={placeholderWidth}
              height={placeholderHeight}
              depth={80} // Depth for the 3D representation
              rotation={(section.rotation * Math.PI) / 180}
            />
          </Canvas>
          <p>{section.title}</p>
          <Button onClick={() => rotateSection(index, 90)} colorScheme="teal" variant="outline">
            Rotate 90 degrees
          </Button>
        </Box>
      ))}
      <Box border="0px" p={4} m={2}>
        <SectionPlaceholder />
      </Box>
    </Flex>
  );
};

export default AssemblyOverview;