// src/components/buttons/AddSectionButton.js
import React from 'react';

const AddSectionButton = ({ onAddSection }) => {
  return (
    <button onClick={onAddSection}>
      + Add Section
    </button>
  );
};

export default AddSectionButton;
