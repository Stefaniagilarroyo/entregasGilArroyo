import React from 'react';
import { Box, Button, Heading, Stack, Text, Divider, Image } from '@chakra-ui/react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, getTotal, getTotalQuantity, clearCart, updateQuantity, removeItem } = useCart();
  const total = getTotal();
  const totalQuantity = getTotalQuantity();

  const handleIncrement = (id) => {
    const product = cart.find(item => item.id === id);
    if (product) {
      updateQuantity(id, product.quantity + 1);
    }
  };

  const handleDecrement = (id) => {
    const product = cart.find(item => item.id === id);
    if (product && product.quantity > 1) {
      updateQuantity(id, product.quantity - 1);
    }
  };

  return (
    <Box p="5">
      <Heading mb="4">Carrito de Compras</Heading>
      {totalQuantity === 0 ? (
        <Text>No hay productos en el carrito</Text>
      ) : (
        <>
          <Stack spacing="4">
            {cart.map((item) => (
              <Box key={item.id} p="5" borderWidth="1px" borderRadius="lg" boxShadow="md">
                <Stack direction="row" spacing="4" alignItems="center">
                  <Image 
                    src={item.img || 'https://via.placeholder.com/150'} 
                    alt={item.name} 
                    boxSize="150px" 
                    objectFit="cover" 
                    borderRadius="md" 
                    border="1px solid gray"
                  />
                  <Box>
                    <Text fontSize="lg" fontWeight="bold">{item.name}</Text>
                    <Text>Cantidad: {item.quantity}</Text>
                    <Stack direction="row" spacing="2" mt="2">
                      <Button 
                        onClick={() => handleDecrement(item.id)} 
                        colorScheme="gray" 
                        variant="outline"
                      >
                        -
                      </Button>
                      <Button 
                        onClick={() => handleIncrement(item.id)} 
                        colorScheme="gray" 
                        variant="outline"
                      >
                        +
                      </Button>
                    </Stack>
                    <Text>Precio x unidad: ${item.price}</Text>
                    <Text>Subtotal: ${item.price * item.quantity}</Text>
                    <Button 
                      mt="4" 
                      colorScheme="gray" 
                      bg="gray.500" 
                      _hover={{ bg: "gray.600" }} 
                      onClick={() => removeItem(item.id)}
                    >
                      Eliminar
                    </Button>
                  </Box>
                </Stack>
              </Box>
            ))}
          </Stack>
          <Divider my="4" />
          <Text fontSize="2xl" fontWeight="bold">Total: ${total}</Text>
          <Stack direction="row" spacing="4" mt="4">
            <Button 
              colorScheme="gray" 
              bg="gray.400" 
              _hover={{ bg: "gray.500" }} 
              onClick={clearCart}
            >
              Limpiar Carrito
            </Button>
            <Link to="/checkout">
              <Button 
                colorScheme="gray" 
                bg="gray.400" 
                _hover={{ bg: "gray.500" }}
              >
                Comprar
              </Button>
            </Link>
          </Stack>
        </>
      )}
    </Box>
  );
};

export default Cart;
