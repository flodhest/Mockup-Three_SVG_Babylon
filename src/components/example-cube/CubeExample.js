// CubeExample.js
import React, { Component } from 'react';
import SceneManager from '../ThreeJSManager/ThreeJSManager';
import Cube from './Cube';
import Grid from './Grid';
import CameraControls from './CameraControls';
import InnerCube from './InnerCube';
import RectangularBox1 from './RectangularBox1';
import RectangularBox2 from './RectangularBox2';
import { getCamera, getRenderer, getScene } from './threeSetup';
import CheckboxToolbar from './CheckboxToolbar';
import TopBar from '../TopBar'; 

class CubeExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
  
      outerCubeColor: '000000',
      horizontalColor: 'ff0000',
      showGrid: true,
      showOuterCube: false,
      outerCubeDimensions: {
        width: 70,
        height: 160,
        depth: 58,
        opacity: 0.4,
      },
      innerCubeDimensions: {
        width: 60,
        height: 30,
        depth: 40,
        opacity: 1,
      },
      innerCubePositions: [
        [0, 40, -10],
        [0, 5, -10],
        [0, -30, -10],
        [0, -65, -10],
      ],
      innerCubeStates: [true, true, true, true],
      rectangularBox1Visible: true,
      rectangularBox2Visible: true,
      rectangularBox1Color: this.getRandomColor(),
      rectangularBox2Color: this.getRandomColor(),
    };
  }

  toggleInnerCube = (index) => {
    const { innerCubeStates, forceRerender } = this.state;
    const newStates = [...innerCubeStates];
    newStates[index] = !newStates[index];
    this.setState({ innerCubeStates: newStates, forceRerender: !forceRerender });
  };

  toggleOuterCubeWireframe = () => {
    const { outerCubeDimensions } = this.state;
    this.setState({
      outerCubeDimensions: {
        ...outerCubeDimensions,
        wireframe: !outerCubeDimensions.wireframe,
      },
    });
  };

  toggleInnerCubeWireframe = () => {
    const { innerCubeDimensions } = this.state;
    this.setState({
      innerCubeDimensions: {
        ...innerCubeDimensions,
        wireframe: !innerCubeDimensions.wireframe,
      },
    });
  };

  toggleRectangularBox1 = () => {
    this.setState((prevState) => ({
      rectangularBox1Visible: !prevState.rectangularBox1Visible,
    }));
  };

  toggleRectangularBox2 = () => {
    this.setState((prevState) => ({
      rectangularBox2Visible: !prevState.rectangularBox2Visible,
    }));
  };

  handleChange = (key, value) => {
    const { outerCubeDimensions, innerCubeDimensions } = this.state;
    if (key in outerCubeDimensions) {
      outerCubeDimensions[key] = value;
      this.setState({ outerCubeDimensions: { ...outerCubeDimensions } });
    } else if (key in innerCubeDimensions) {
      innerCubeDimensions[key] = value;
      this.setState({ innerCubeDimensions: { ...innerCubeDimensions } });
    } else {
      this.setState({ [key]: value });
    }
  };

  getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  

  render() {
    const {
      outerCubeColor,
      showGrid,
      showOuterCube,
      outerCubeDimensions,
      innerCubeDimensions,
      innerCubePositions,
      innerCubeStates,
      rectangularBox1Visible,
      rectangularBox2Visible,
      horizontalColor,
      rectangularBox2Color,
      
    } = this.state;
    return (
   
      <>  <TopBar /><CheckboxToolbar
        showGrid={showGrid}
        showOuterCube={showOuterCube}
        rectangularBox1Visible={rectangularBox1Visible}
        rectangularBox2Visible={rectangularBox2Visible}
        innerCubeStates={innerCubeStates}
        handleChange={this.handleChange}
        toggleInnerCube={this.toggleInnerCube} />      
          <SceneManager
        getCamera={getCamera}
        getRenderer={getRenderer}
        getScene={getScene}
        canvasStyle={{
          position: 'absolute',
          height: '75%',
          width: '25%',
          zIndex: -1,
        }}
      >
        <CameraControls />
        {showGrid && <Grid position={[0, 0, 0]} />}
        {showOuterCube && (
          <Cube
            color={Number(`0x${outerCubeColor}`)}
            position={[0, -outerCubeDimensions.height / 2 - -60, -13]}
            {...outerCubeDimensions}
          />
        )}
        {innerCubeStates.map((isVisible, index) => (
          <InnerCube
            key={index}
            color={Number(`0x${this.getRandomColor()}`)}
            position={innerCubePositions[index]}
            isVisible={isVisible}
            toggleVisibility={() => this.toggleInnerCube(index, !isVisible)}
            {...innerCubeDimensions}
          />
        ))}
        {rectangularBox1Visible && (
          <RectangularBox1
            position={[0, 0, -35]}
            color={Number(`0x${horizontalColor}`)}
            isVisible={true}
            toggleVisibility={() => this.toggleRectangularBox1()}
            width={65}
            height={10}
            depth={5}
          />
        )}
        {rectangularBox1Visible && (
          <RectangularBox1
            position={[0, 20, -35]}
            color={Number(`0x${horizontalColor}`)}
            isVisible={true}
            toggleVisibility={() => this.toggleRectangularBox1()}
            width={65}
            height={10}
            depth={5}
          />
        )}
        {rectangularBox2Visible && (
          <RectangularBox2
            position={[0, -10, -40]}
            isVisible={true}
            color={Number(`0x${rectangularBox2Color}`)}
            toggleVisibility={() => this.toggleRectangularBox2()}
            width={10}
            height={140}
            depth={5}
          />
        )}
      </SceneManager></>
    );
  }
}

export default CubeExample;
