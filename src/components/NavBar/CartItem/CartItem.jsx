import React from 'react';
import { Box, Text, Button, Image, Stack } from '@chakra-ui/react';
import { useCart } from '../../context/CartContext';

const CartItem = ({ id, name, quantity, price, img }) => {
  const { removeItem, updateQuantity } = useCart();

  const handleIncrement = () => {
    updateQuantity(id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
    } else {
      removeItem(id);
    }
  };

  return (
    <Box p="5" borderWidth="1px" borderRadius="lg" boxShadow="md">
      <Stack direction="row" spacing="4" alignItems="center">
        <Image 
          src={img || 'https://via.placeholder.com/150'} 
          alt={name} 
          boxSize="150px" 
          objectFit="cover" 
          borderRadius="md" 
          border="1px solid gray"
        />
        <Box>
          <Text fontSize="lg" fontWeight="bold">{name}</Text>
          <Text>Cantidad: {quantity}</Text>
          <Text>Precio x unidad: ${price}</Text>
          <Text>Subtotal: ${price * quantity}</Text>
          <Stack direction="row" spacing="2" mt="2">
            <Button 
              colorScheme="gray" 
              variant="outline" 
              onClick={handleIncrement}
            >
              +
            </Button>
            <Button 
              colorScheme="gray" 
              variant="outline" 
              onClick={handleDecrement}
            >
              -
            </Button>
            <Button 
              colorScheme="gray" 
              bg="gray.500" 
              _hover={{ bg: "gray.600" }} 
              onClick={() => removeItem(id)}
            >
              Eliminar
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default CartItem;
