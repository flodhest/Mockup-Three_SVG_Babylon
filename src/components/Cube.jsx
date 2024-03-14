import React, { useRef, useState, useEffect } from 'react';
import { useControls } from 'leva';
import { Html } from '@react-three/drei';
import { EditIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, MenuList, MenuItem, useToast } from '@chakra-ui/react';

let cubeCounter = 0;

const Cube = ({ position, onClick, onRemove, onAddGroup }) => {
  const meshRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWireframe, setIsWireframe] = useState(false);
  const toast = useToast();

  cubeCounter++;
  const cubeId = `Group-${cubeCounter}`;

  const localControls = useControls(
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

  useEffect(() => {
    setIsWireframe(localControls.wireframe);
  }, [localControls.wireframe]);

  const handleEditClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = (option) => {
    if (option === 'Delete') {
      onRemove();
      toast({
        title: 'Cube Deleted',
        status: 'success',
        isClosable: true,
      });
    } else if (option === 'AddGroup') {
      onAddGroup();
      toast({
        title: 'Group Added',
        status: 'success',
        isClosable: true,
      });
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const serializedCubeState = JSON.stringify(localControls);
    localStorage.setItem(`cubeState-${cubeId}`, serializedCubeState);
  }, [localControls, cubeId, position]);

  return (
    <mesh
      ref={meshRef}
      position={[localControls.positionX, localControls.positionY, localControls.positionZ]}
      onClick={onClick}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <boxGeometry args={[localControls.width, localControls.height, localControls.depth]} />
      <meshBasicMaterial
        wireframe={localControls.wireframe}
        color={isHovered ? 0xff0000 : localControls.color}
        transparent
        opacity={localControls.opacity}
        visible={localControls.visibility}
      />
      <Html>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
            <MenuButton
              onClick={handleEditClick}
              bgColor={isHovered ? 'blue.600' : 'blue.500'}
              color={isWireframe ? 'black' : 'white'}
              borderRadius="md"
              p={2}
            >
              <EditIcon style={{ cursor: 'pointer', height: '15px', width: '15px' }} />
            </MenuButton>
            <MenuList color="black" bgColor="grey">
              <MenuItem onClick={() => handleMenuItemClick('AddGroup')} _hover={{ bgColor: 'blue.600' }}>
                Add Group
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick('Delete')} _hover={{ bgColor: 'red.500' }}>
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Html>
    </mesh>
  );
};

export default Cube;
