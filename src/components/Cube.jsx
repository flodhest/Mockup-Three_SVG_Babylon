import React, { useRef, useState } from 'react';
import { useControls } from 'leva';
import { Html } from '@react-three/drei';
import { EditIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { motion } from 'framer-motion';


const AnimatedMenuButton = motion(MenuButton);
const Cube = ({ position, onClick, opacity }) => {
  const ref = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const controls = useControls(
    `Group ${position.join('-')} Controls`,
    {
      visibility: { value: true, label: 'Visible' },
      color: { value: '#000', label: 'Color' },
      height: { value: 1.2, min: 0, max: 5, label: 'Height', step: 0.01 },
      width: { value: 2.5, min: 0, max: 5, label: 'Width', step: 0.1 },
      depth: { value: 2, min: 0, max: 5, label: 'Depth', step: 0.1 },
      positionX: { value: position[0], min: -5, max: 5, label: 'X-Position', step: 0.001 },
      positionY: { value: position[1], min: -5, max: 5, label: 'Y-Position', step: 0.001 },
      positionZ: { value: position[2], min: -5, max: 5, label: 'Z-Position', step: 0.100 },
      wireframe: { value: false, label: 'Wireframe' },
      opacity: { value: opacity || 1, min: 0, max: 1, label: 'Opacity', step: 0.5 },
    },
    { collapsed: true }
  );
  const handleEditClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = (option) => {
    // Handle the click event for menu items
    console.log(`Clicked on ${option}`);
    // Close the menu if needed
    setIsMenuOpen(false);
  };

  return (
    <mesh
      ref={ref}
      position={[controls.positionX, controls.positionY, controls.positionZ]}
      onClick={onClick}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <boxGeometry args={[controls.width, controls.height, controls.depth]} />
      <meshBasicMaterial
        wireframe={controls.wireframe}
        color={isHovered ? 0x0000ff : controls.color}

        transparent
        opacity={controls.opacity}
        visible={controls.visibility}
      />
      <Html>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
            <AnimatedMenuButton
              as={Button}
              onClick={handleEditClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              bgColor="blue.500" // Set background color
              color="lightgrey" // Set font color
            >
              <EditIcon style={{ cursor: 'pointer', height: '15px', width: '15px' }} />
            </AnimatedMenuButton>
            <MenuList>
              <MenuItem  color="white"  onClick={() => handleMenuItemClick('Option 1')}>Add group</MenuItem>
          
              {/* Add more menu options as needed */}
            </MenuList>
          </Menu>
        </div>
      </Html>
    </mesh>
  );
};

export default Cube;