import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../asyncMock';
import ItemDetail from '../../ItemDetail/ItemDetail';

const ItemDetailContainer = () => {
    const [product, setProduct] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        getProductById(id)
            .then((res) => {
                setProduct(res);
            })
            .catch((err) => console.log(err));
    }, [id]);

    return (
        <div>
            {product && <ItemDetail {...product} />}
        </div>
    );
}

export default ItemDetailContainer;


