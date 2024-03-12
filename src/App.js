// src/App.js
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import TopBar from './components/TopBar';
import AssemblyOverview from './components/AssemblyOverview';

const Home = () => {
  const [sections, setSections] = useState([]);

  const addSection = () => {
    if (sections.length < 4) {
      const newSection = { title: `Section ${sections.length + 1}`, rotation: 0 };
      setSections([...sections, newSection]);
    }
  };

  return (
    <Box>
      <TopBar addSection={addSection} />
      <Flex>
        <Box>
          <AssemblyOverview sections={sections} setSections={setSections} />
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
