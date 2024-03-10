// AssemblyOverview.js
import React from 'react';
import { Flex, Box } from '@chakra-ui/react';
import { Canvas } from '@react-three/fiber';
import Viewer from './Viewer';
import SectionPlaceholder from './SectionPlaceholder';
import './AssemblyOverview.css';

const AssemblyOverview = ({ sections, setSections }) => {
  const placeholderWidth = 200;
  const placeholderHeight = 540;

  return (
    <Flex position="relative" justifyContent="center" alignItems="center">
      {sections.map((section, sectionIndex) => (
        <Box key={sectionIndex} border="1px solid black" p={4} m={2} borderRadius="md">
          <Canvas style={{ width: `${placeholderWidth}px`, height: `${placeholderHeight}px` }}>
            <Viewer
              key={sectionIndex}
              cubes={section.cubes}
              handleCubeSelection={(cubeIndex, properties) => {
                const updatedSections = [...sections];
                updatedSections[sectionIndex].cubes[cubeIndex] = {
                  ...updatedSections[sectionIndex].cubes[cubeIndex],
                  ...properties,
                };
                setSections(updatedSections);
              }}
            />
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
