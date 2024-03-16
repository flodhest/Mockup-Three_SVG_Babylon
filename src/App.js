// src/App.js
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import TopBar from './components/TopBar';
import AssemblyOverview from './components/AssemblyOverview';
import { Leva } from 'leva'
const Home = () => {
  const [sections, setSections] = useState([]);
 const onSidebarToggle = (isOpen) => {
    // Your logic for toggling the sidebar
    console.log('Sidebar is now', isOpen ? 'open' : 'closed');
  };

  const addSection = () => {
    if (sections.length < 4) {
      const newSection = { title: `Section ${sections.length + 1}`, rotation: 0 };
      setSections([...sections, newSection]);
    }
  };

  return (
    <Box>
      <TopBar addSection={addSection} onSidebarToggle={onSidebarToggle} />
      <Flex>
      <Leva collapsed />
        <Box>
          <AssemblyOverview sections={sections} setSections={setSections} onSidebarToggle={onSidebarToggle} />
        </Box>
      </Flex>
    </Box>
  );
};


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

    </Routes>
  );
};

export default App;
