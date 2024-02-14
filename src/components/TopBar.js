
import React from 'react';
import { Box, Button, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

const TopBar = ({ addSection }) => {
  return (
    <Box bg="lightgrey" p={4}>
      <Tabs isFitted variant="enclosed-colored">
        <TabList>
          <Tab _selected={{ color: 'white', bg: 'orange' }}>Mechanical</Tab>
          <Tab _selected={{ color: 'white', bg: 'orange' }}>Electronical</Tab>
          <Tab _selected={{ color: 'white', bg: 'orange' }}>Layers</Tab>
          <Tab _selected={{ color: 'white', bg: 'orange' }}>Misc</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Tabs>
              <TabPanels>
                <TabPanel>
                  <Tabs>
                    <TabList>
                      <Tab>Frame</Tab>
                      <Tab>Misc</Tab>
                      <Tab>Busbar</Tab>
                    </TabList>
                    <TabPanels>
                      <TabPanel>
                        <Button
                          onClick={addSection}
                          colorScheme="teal"
                          variant="ghost"
                          mt={1} 
                        >
                          + Add Section
                        </Button>
                        <Button
                          onClick={addSection}
                          colorScheme="teal"
                          variant="ghost"
                          mt={1} 
                        >
                          + Add Group
                        </Button>
                        <Button
                          onClick={addSection}
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
