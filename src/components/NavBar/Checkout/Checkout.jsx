import React, { useState } from 'react';
import { Box, Button, Heading, Stack, Text, Divider, Image, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import { useCart } from '../../context/CartContext';
import { collection, documentId, getDocs, query, where, writeBatch, addDoc } from 'firebase/firestore';
import { db } from '../../../services/firebase';
import { useNotification } from '../../context/NotificationContext';

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const [orderCreated, setOrderCreated] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    email: ''
  });
  const { cart, totalQuantity, getTotal } = useCart();
  const total = getTotal();
  const { setNotification } = useNotification();
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email) {
      toast({
        title: "Error",
        description: "El email es obligatorio.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    
    setLoading(true);
    try {
      const objOrder = {
        buyer: form,
        items: cart,
        totalQuantity,
        total,
        date: new Date(),
      };

      const ids = cart.map((item) => item.id);

      const productosRef = collection(db, "productos");
      const productosAddedFromFirestore = await getDocs(
        query(productosRef, where(documentId(), "in", ids))
      );
      const { docs } = productosAddedFromFirestore;

      const outOfStock = [];
      const batch = writeBatch(db);

      docs.forEach((doc) => {
        const dataDoc = doc.data();
        const stockDB = dataDoc.stock;

        const productoAddedToCart = cart.find((prod) => prod.id === doc.id);
        const productQuantity = productoAddedToCart?.quantity;

        if (stockDB >= productQuantity) {
          batch.update(doc.ref, { stock: stockDB - productQuantity });
        } else {
          outOfStock.push({ id: doc.id, ...dataDoc });
        }
      });

      if (outOfStock.length === 0) {
        await batch.commit();
        const orderRef = collection(db, "orders");
        await addDoc(orderRef, objOrder);
        setOrderCreated(true);
        setForm({
          firstName: '',
          lastName: '',
          phone: '',
          address: '',
          email: ''
        });
      } else {
        setNotification("danger", "Hay productos sin stock");
      }
    } catch (error) {
      setNotification("danger", "Error al crear la orden");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p="5">
      <Heading mb="4" textAlign="center">Checkout</Heading>
      {loading ? (
        <Text textAlign="center">Se está generando la orden...</Text>
      ) : orderCreated ? (
        <Text textAlign="center">La orden fue creada con éxito</Text>
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
                  <Box textAlign="center">
                    <Text fontSize="lg" fontWeight="bold">{item.name}</Text>
                    <Text>Cantidad: {item.quantity}</Text>
                    <Text>Precio x unidad: ${item.price}</Text>
                    <Text fontSize="xl" fontWeight="bold">Subtotal: ${item.price * item.quantity}</Text>
                  </Box>
                </Stack>
              </Box>
            ))}
          </Stack>
          <Divider my="4" />
          <Text fontSize="2xl" fontWeight="bold" textAlign="center">Total: ${total}</Text>
          <Box as="form" onSubmit={handleSubmit} mt="6" p="5" borderWidth="1px" borderRadius="lg" boxShadow="md" bg="white">
            <Heading size="md" mb="4">Información de Pago</Heading>
            <Stack spacing="4">
              <FormControl id="firstName" isRequired>
                <FormLabel>Nombre</FormLabel>
                <Input type="text" name="firstName" value={form.firstName} onChange={handleChange} />
              </FormControl>
              <FormControl id="lastName">
                <FormLabel>Apellido</FormLabel>
                <Input type="text" name="lastName" value={form.lastName} onChange={handleChange} />
              </FormControl>
              <FormControl id="phone">
                <FormLabel>Teléfono</FormLabel>
                <Input type="text" name="phone" value={form.phone} onChange={handleChange} />
              </FormControl>
              <FormControl id="address">
                <FormLabel>Dirección</FormLabel>
                <Input type="text" name="address" value={form.address} onChange={handleChange} />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" name="email" value={form.email} onChange={handleChange} />
              </FormControl>
              <Button 
                colorScheme="gray" 
                type="submit" 
                isLoading={loading} 
                size="lg"
                _hover={{ bg: "gray.600" }}
                _active={{ bg: "gray.700" }}
              >
                Generar Orden
              </Button>
            </Stack>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Checkout;

