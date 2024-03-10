import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const SectionPlaceholder = ({ onClick }) => {
  return (
    <Box
      border="2px dotted" 
      borderRadius="md" 
      p={0}
      m={-3}
      width="230px"
      height="560px"
      textAlign="center"
      cursor="pointer"
      onClick={onClick}
      _hover={{ bg: 'gray.200' }}
    >
      <Text fontSize="3xl" fontWeight="bold" color="grey">
        +
      </Text>
      <Text fontSize="l" fontWeight="bold" mt={4} color="grey">
        Section placeholder
      </Text>
    </Box>
  );
};

export default SectionPlaceholder;