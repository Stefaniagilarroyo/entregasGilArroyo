import React, { useState } from 'react';
import { Box, Image, Text, Button, Stack, Center, VStack, Select, FormControl, FormLabel, useBreakpointValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';

const ItemDetail = ({ id, name, img, price, description, stock }) => {
  const { addItem, isInCart } = useCart();
  const { setNotification } = useNotification();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('chico');
  const [selectedColor, setSelectedColor] = useState('nude1');

  const handleAdd = () => {
    const productObj = { id, name, img, price, quantity, size: selectedSize, color: selectedColor };
    addItem(productObj);
    setNotification("success", `Se agregaron ${quantity} de ${name}`);
  };

  const handleIncrement = () => {
    if (quantity < stock) {
      setQuantity(prevQuantity => prevQuantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const imageSize = useBreakpointValue({ base: '200px', md: '300px', lg: '400px' });

  return (
    <Center p="6" bg="gray.50">
      <VStack 
        maxW={{ base: 'full', md: 'lg' }} 
        borderWidth="1px" 
        borderRadius="lg" 
        overflow="hidden" 
        boxShadow="lg" 
        p="6" 
        spacing="5"
        align="center"
        bg="white"
      >
        <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: '4', md: '6' }} align="center">
          <Box flex="1" display="flex" justifyContent="center">
            <Image 
              src={img} 
              alt={name} 
              boxSize={imageSize} 
              objectFit="cover" 
              borderRadius="md" 
              border="1px solid #e2e8f0"
            />
          </Box>
          <Box flex="2" textAlign="center">
            <Stack spacing="4">
              <Text fontSize="2xl" fontWeight="bold" color="gray.800">{name}</Text>
              <Text fontSize="lg" color="gray.600">{description}</Text>
              <Text fontSize="xl" fontWeight="bold" color="gray.800">${price}</Text>
              <Text fontSize="md" color="gray.500">Disponible: {stock}</Text>

              <Stack spacing="4">
                <Stack direction={{ base: 'column', md: 'row' }} spacing="4">
                  <FormControl>
                    <FormLabel fontSize="sm">Color</FormLabel>
                    <Select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
                      <option value="nude1">Nude Claro</option>
                      <option value="nude2">Nude Medio</option>
                      <option value="nude3">Nude Oscuro</option>
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="sm">Tamaño</FormLabel>
                    <Select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                      <option value="chico">Chico</option>
                      <option value="mediano">Mediano</option>
                      <option value="grande">Grande</option>
                    </Select>
                  </FormControl>
                </Stack>

                <Stack direction="row" spacing="4" align="center" justify="center">
                  <Button onClick={handleDecrement} colorScheme="gray" variant="outline">-</Button>
                  <Text fontSize="lg">Cantidad: {quantity}</Text>
                  <Button onClick={handleIncrement} colorScheme="gray" variant="outline">+</Button>
                </Stack>
              </Stack>

              <Stack direction="row" spacing="4" justify="center">
                {isInCart(id) ? (
                  <Link to='/cart'>
                    <Button 
                      colorScheme="gray" 
                      bg="gray.600" 
                      _hover={{ bg: "gray.700" }}
                      size="lg"
                    >
                      Finalizar Compra
                    </Button>
                  </Link>
                ) : (
                  <Button 
                    colorScheme="gray" 
                    bg="gray.600" 
                    _hover={{ bg: "gray.700" }} 
                    onClick={handleAdd}
                    size="lg"
                  >
                    Agregar al Carrito
                  </Button>
                )}
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </VStack>
    </Center>
  );
};

export default ItemDetail;

