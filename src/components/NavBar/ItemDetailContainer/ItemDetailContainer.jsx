import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from '../../ItemDetail/ItemDetail';
import { db } from '../../../services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Box } from "@chakra-ui/react";

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "productos", productId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const productData = docSnap.data();
          const imgPath = productData.img; 
          setProduct({ id: docSnap.id, ...productData, img: imgPath });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Box>
      {product && <ItemDetail {...product} />}
    </Box>
  );
};

export default ItemDetailContainer;
