import React, { useState, useEffect } from 'react';
import ItemList from '../ItemList/ItemList';
import { useParams } from 'react-router-dom';
import { db } from '../../../services/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useNotification } from '../../context/NotificationContext';
import { Wrap, WrapItem, Heading } from "@chakra-ui/react";

function ItemListContainer ({ greetings }) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const { categoryId } = useParams();
  const { setNotification } = useNotification();

  useEffect(() => {
    setLoading(true);
    const collectionRef = categoryId
      ? query(collection(db, "productos"), where("category", "==", categoryId))
      : collection(db, "productos");

    getDocs(collectionRef)
      .then((querySnapshot) => {
        const productos = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setProducts(productos);
      })
      .catch(() => {
        setNotification("danger", `No es posible cargar los productos`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Heading>{greetings}</Heading>
      <Wrap spacing="30px" justify="center">
        <ItemList products={products} />
      </Wrap>
    </div>
  );
};

export default ItemListContainer;
