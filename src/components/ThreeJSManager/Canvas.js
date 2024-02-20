// src/components/ThreeJSManager/Canvas.js
import React from 'react';
import { Canvas as ReactThreeCanvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Controls = () => {
  const { camera, gl } = useThree();
  const controls = React.useRef();

  useFrame(() => {
    if (controls.current) {
      controls.current.update();
    }
  });

  return <primitive object={controls} />;
};

const Canvas = ({ children, ...props }) => {
  return (
    <ReactThreeCanvas {...props}>
      <Controls />
      {children}
    </ReactThreeCanvas>
  );
};

export default Canvas;
