
import React from 'react';
import { Box, Button, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

const TopBar = ({ addSection }) => {
  return (
    <Box bg="lightgrey" p={0}>
      <Tabs isFitted variant="enclosed-colored">
        <TabList  p={0}>
          <Tab _selected={{ color: 'white', bg: 'orange' }}>MY PROJECTS</Tab>
          <Tab _selected={{ color: 'white', bg: 'orange' }}>NEW PROJECT</Tab>
          <Tab _selected={{ color: 'white', bg: 'orange' }}>ASSEMBLY SETUP</Tab>
          <Tab _selected={{ color: 'white', bg: 'orange' }}>ASSEMBLY</Tab>
        </TabList>
        <TabPanels  p={0}>
          <TabPanel  p={0}>
            <Tabs  p={0}>
              <TabPanels  p={0}>
                <TabPanel  p={0}>
                  <Tabs  p={0}>
                    <TabList  p={0}>
                      <Tab  p={3}>Frame</Tab>
                      <Tab >Misc</Tab>
                      <Tab>Busbar</Tab>
                    </TabList>
                    <TabPanels  p={0}>
                      <TabPanel  p={0}>
                        <Button
                          onClick={addSection}
                          colorScheme="teal"
                          variant="ghost"
                          mt={1}
                         
                        >
                          + Add Section
                        </Button>
                        <Button
                    
                          colorScheme="teal"
                          variant="ghost"
                          mt={1} 
                        >
                          + Add Group
                        </Button>
                        <Button
                   
                          colorScheme="teal"
                          variant="ghost"
                          mt={1} 
                        >
                          + Add Door
                        </Button>
                      </TabPanel>
           
                      <TabPanel>
                        {/* Content for "Busbar" */}
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </TabPanel>
                <TabPanel>
                  {/* Content for "Busbar" */}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </TabPanel>
          <TabPanel>
            {/* Electronical Sub-Tab Panels */}
          </TabPanel>
          <TabPanel>
            {/* Layers Sub-Tab Panels */}
          </TabPanel>
          <TabPanel>
            {/* Misc Sub-Tab Panels */}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default TopBar;
