// CheckboxToolbar.js
import React, { Component } from 'react';

class CheckboxToolbar extends Component {
  render() {
    const { showGrid, showOuterCube, rectangularBox1Visible, rectangularBox2Visible, innerCubeStates, handleChange, toggleInnerCube } =
      this.props;

    return (
      <div
        style={{
   
          top: '10px',
          right: '10px',
          padding: '10px',
          background: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '5px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
         
        }}
      >
        <label>
          <input
            type="checkbox"
            checked={showGrid}
            onChange={() => handleChange('showGrid', !showGrid)}
          />
          Show Grid
        </label>

        <label>
          <input
            type="checkbox"
            checked={showOuterCube}
            onChange={() => handleChange('showOuterCube', !showOuterCube)}
          />
          Show Outer Cube
        </label>

        <label>
          <input
            type="checkbox"
            checked={rectangularBox1Visible}
            onChange={() => handleChange('rectangularBox1Visible', !rectangularBox1Visible)}
          />
          Toggle Horizontal
        </label>

        <label>
          <input
            type="checkbox"
            checked={rectangularBox2Visible}
            onChange={() => handleChange('rectangularBox2Visible', !rectangularBox2Visible)}
          />
          Toggle Vertical
        </label>

        {innerCubeStates.map((isVisible, index) => (
          <label key={`innerCube-${index}`}>
            <input
              type="checkbox"
              checked={isVisible}
              onChange={() => toggleInnerCube(index, !isVisible)}
            />
            Toggle Inner Cube {index + 1}
          </label>
        ))}
      </div>
    );
  }
}

export default CheckboxToolbar;
