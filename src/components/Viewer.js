import React, { useState } from 'react';
import { useControls } from 'leva';
import { OrbitControls, Html } from '@react-three/drei';
import { extend } from 'react-three-fiber';
import { Button } from '@chakra-ui/react';
import { Color } from 'three';
extend({ OrbitControls, Button });

const useCubeControls = (id) => {
  return useControls({
    [`width-${id}`]: {
      value: 2.2,
      min: 0.4,
      max: 5.5,
      step: 0.01,
    },
    [`height-${id}`]: {
      value: 5.5,
      min: 0.1,
      max: 6.0,
      step: 0.01,
    },
    [`depth-${id}`]: {
      value: 1.2,
      min: 0.4,
      max: 2.5,
      step: 0.01,
    },
    [`color-${id}`]: {
      value: '#fff',
    },
    [`wireframe-${id}`]: {
      value: true,
    },
    [`visibility-${id}`]: {
      value: true,
    },
    [`position-x-${id}`]: {
      value: 0,
      min: -10,
      max: 10,
      step: 0.01,
    },
    [`position-y-${id}`]: {
      value: 0,
      min: -10,
      max: 10,
      step: 0.01,
    },
    [`position-z-${id}`]: {
      value: 0,
      min: -10,
      max: 10,
      step: 0.01,
    },
    [`opacity-${id}`]: {
      value: 1,
      min: 0,
      max: 1,
      step: 0.01,
    },
    [`cadAdvancedFunction-${id}`]: {
      value: 'none',
      options: ['none', 'chamfer', 'extrude'],
    },
  });
};

const Cube = ({ id, position, onClick, isSelected, handleCubeClick }) => {
  const controls = useCubeControls(id);

  // Convert color string to Color object
  const cubeColor = new Color(isSelected ? 'yellow' : controls[`color-${id}`]);

  return (
    <mesh
      scale={[controls[`width-${id}`], controls[`height-${id}`], controls[`depth-${id}`]]}
      position={[
        controls[`position-x-${id}`],
        controls[`position-y-${id}`],
        controls[`position-z-${id}`],
      ]}
      onClick={() => handleCubeClick(id)}
      visible={controls[`visibility-${id}`]}
    >
      <boxGeometry />
      <meshStandardMaterial
        wireframe={controls[`wireframe-${id}`]}
        color={cubeColor}
        opacity={controls[`opacity-${id}`]}
        transparent={controls[`opacity-${id}`] < 1}
      />
    </mesh>
  );
};

const ButtonOverlay = ({ position, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Html position={position} center>
      <div style={{ pointerEvents: 'auto', display: 'inline-block' }}>
        <Button onClick={onClick} onMouseOver={() => setHovered(true)} onMouseOut={() => setHovered(false)}>
          {hovered ? 'Click to Add Cube' : 'Add Cube'}
        </Button>
      </div>
    </Html>
  );
};

const Viewer = () => {
  const [cubes, setCubes] = useState([{ id: 1, position: [0, 0, 0], isSelected: false }]);

  const handleCubeClick = (id) => {
    console.log(`Cube with ID ${id} clicked`);
  };

  const addCube = () => {
    const newCube = {
      id: cubes.length + 1,
      position: [0, cubes.length * 2.2, 0],
      isSelected: false,
    };
    console.log('Adding new cube:', newCube);
    setCubes((prevCubes) => [...prevCubes, newCube]);
  };

  return (
    <>
      <OrbitControls
        enableDamping
        dampingFactor={0.25}
        rotateSpeed={0.4}
        zoomSpeed={0.8}
        panSpeed={0.8}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 1.5}
      />
      <pointLight position={[10, 10, 10]} />

      {cubes.map((cube) => (
        <Cube key={cube.id} {...cube} handleCubeClick={handleCubeClick} />
      ))}

      <ButtonOverlay position={[0, 0, 0]} onClick={addCube} />
    </>
  );
};

export default Viewer;
