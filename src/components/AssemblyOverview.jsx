import React, {  useState, useRef, useEffect } from 'react';
import { Flex, Box, Button, Icon, IconButton, useDisclosure } from '@chakra-ui/react';
import { Canvas } from '@react-three/fiber';
import { Stats, OrbitControls } from '@react-three/drei';
import { ChevronLeftIcon, ChevronRightIcon, DownloadIcon, EditIcon } from '@chakra-ui/icons';
import Cube from './Cube';
import * as THREE from 'three';
import { GLTFExporter } from './exporters/GLTFExporter';

const AssemblyOverview = ({ sections, setSections }) => {
  const sceneRef = useRef();
  const [sectionRefs, setSectionRefs] = useState([]);
  const [frameVisible, setFrameVisible] = useState(false);
  const [busbarVisible, setBusbarVisible] = useState(false);
  const [railsVisible, setRailsVisible] = useState(false);
  const [gridVisible, setGridVisible] = useState(false);

  useEffect(() => {
    setSectionRefs(Array(sections.length).fill(null).map(() => React.createRef()));
  }, [sections]);

  const { isOpen, onToggle } = useDisclosure();

  const rotateSection = (index, rotationStep) => {
    const updatedSections = [...sections];
    updatedSections[index].rotation = (updatedSections[index].rotation + rotationStep) % 360;
    setSections(updatedSections);
  };

  const exportToGLTF = async (sectionIndex) => {
    console.log(`Exporting section ${sectionIndex + 1} to GLTF`);
  
    // Check if section data and references are valid
    const selectedSection = sections[sectionIndex];
    if (!selectedSection || !sectionRefs[sectionIndex] || !sectionRefs[sectionIndex].current) {
      console.error(`Section ${sectionIndex + 1} reference is not properly set.`);
      return;
    }
  
    const gltfExporter = new GLTFExporter();
  
    // Create a scene for the selected section
    const sectionScene = new THREE.Scene();
    sectionRefs[sectionIndex].current.traverse((child) => {
      const clone = child.clone();
      sectionScene.add(clone);
    });
  
    // Set up export options
    const options = {
      binary: false, // Export as binary format (glb)
      animations: [], // Include animations if applicable
      embedImages: true, // Embed textures as Data URIs
      includeCustomExtensions: true, // Include custom extensions if needed
    };
  
    try {
      // Perform the export asynchronously
      const gltf = await new Promise((resolve, reject) => {
        gltfExporter.parse(sectionScene, (result) => {
          if (result instanceof ArrayBuffer) {
            // This case handles binary GLTF format (glb)
            console.error('GLB format not supported. Please set "binary" option to true.');
            reject(new Error('GLB format not supported.'));
          } else {
            resolve(result);
          }
        }, options);
      });
  
      // Convert GLTF data to JSON format
      const gltfData = JSON.stringify(gltf, null, 2); // Prettify JSON with indentation
  
      // Create a blob from the GLTF data
      const gltfBlob = new Blob([gltfData], { type: 'model/gltf+json' });
  
      // Create a temporary URL for the blob
      const url = URL.createObjectURL(gltfBlob);
  
      // Create a link element and click it programmatically to trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.download = `section_${sectionIndex + 1}.gltf`; // Set desired filename
      link.click();
  
      console.log(`Export of section ${sectionIndex + 1} to GLTF completed successfully.`);
    } catch (error) {
      console.error('Error exporting GLTF:', error);
      alert(`Error exporting GLTF: ${error.message}`); // Notify user of any errors
    }
  };

  return (
    <Flex position="relative" justifyContent="center" alignItems="center">
      {sections.map((section, sectionIndex) => (
        <Box key={sectionIndex} border="1px solid black" p={4} m={2} borderRadius="md" position="relative">
          <Canvas camera={{ position: [0, 0, 7] }} style={{ width: '200px', height: '450px' }}>
            <group ref={sceneRef}>
              <group rotation={[0, (section.rotation * Math.PI) / 180, 0]} ref={sectionRefs[sectionIndex]}>
                {/* Rendering Cube components */}
                <Cube
                  position={[0, 2.4, 0]}
                  isSelected={false}
                />
                <Cube
                  position={[0, 1, 0]}
                  isSelected={false}
                />
                <Cube
                  position={[0, -0.3, 0]}
                  isSelected={false}
                />
                <Cube
                  position={[0, -1.6, 0]}
                  isSelected={false}
                />
                <Cube
                  position={[0, -3.2, 0]}
                  isSelected={false}
                />
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
            <Box
              position="absolute"
              top="2.5rem"
              right="0"
              p={4}
              bgColor="white"
              border="1px solid black"
              borderRadius="md"
              zIndex="2"
            >
              {/* Add controls for frame, busbar, rails, and grid */}
              <Button
                onClick={() => setFrameVisible(!frameVisible)}
                colorScheme="blue"
                variant="ghost"
                size="sm"
                mb={2}
              >
                Frame
              </Button>
              <Button
                onClick={() => setBusbarVisible(!busbarVisible)}
                colorScheme="blue"
                variant="ghost"
                size="sm"
                mb={2}
              >
                Busbar
              </Button>
              <Button
                onClick={() => setRailsVisible(!railsVisible)}
                colorScheme="blue"
                variant="ghost"
                size="sm"
                mb={2}
              >
                Vertical Rails
              </Button>
              <Button
                onClick={() => setGridVisible(!gridVisible)}
                colorScheme="blue"
                variant="ghost"
                size="sm"
                mb={2}
              >
                Grid
              </Button>
              {/* Export button */}
              <Button
                leftIcon={<DownloadIcon />}
                onClick={() => exportToGLTF(sectionIndex)}
                colorScheme="blue"
                variant="ghost"
                size="sm"
              >
                Export GLTF
              </Button>
            </Box>
          )}
        </Box>
      ))}
      <Box border="0px" p={2} m={2}>
        {/* Placeholder */}
      </Box>
    </Flex>
  );
};

export default AssemblyOverview;
