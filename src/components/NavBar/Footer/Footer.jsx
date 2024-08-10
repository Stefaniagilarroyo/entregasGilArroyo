import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box bg="gray.800" color="white" py="4" textAlign="center">
      <Flex justify="center" align="center" direction="column">
        <Text mb="2">© 2024 Nia Ecotienda. Todos los derechos reservados.</Text>
      </Flex>
    </Box>
  );
};

export default Footer;


