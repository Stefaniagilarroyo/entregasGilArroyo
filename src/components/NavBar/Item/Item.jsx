import { Box, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Item = ({ product }) => {
  return (
    <Box
      maxW="100%"   
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      border="none"
      p="5"
      textAlign="center"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Link to={`/detail/${product.id}`}>
        <Image
          src={product.img}
          alt={product.name}
          boxSize="200px"  
          objectFit="cover"
          mx="auto"
        />
        <Text mt="4" fontSize="xl" fontWeight="bold" color="teal.600">
          {product.name}
        </Text>
        <Text mt="2" fontSize="lg" fontWeight="bold" color="gray.800">
          ${product.price}
        </Text>
      </Link>
    </Box>
  );
};

export default Item;
