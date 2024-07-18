import React from 'react';
import { Link } from 'react-router-dom';

const Item = ({ id, name, img, category, price }) => {
  const defaultImageUrl = 'https://via.placeholder.com/150'; // URL de la imagen predeterminada

  return (
    <article>
      <h1>{name}</h1>
      <img 
        src={img || defaultImageUrl} 
        alt={name} 
        style={{ width: 100 }} 
        onError={(e) => {e.target.onerror = null; e.target.src=defaultImageUrl}} 
      />
      <p>Category: {category}</p>
      <h2>{price}</h2>
      <Link to={`/item/${id}`}>Ver Detalle</Link>
      <hr /> {/* genera una línea entre productos */}
    </article>
  );
}

export default Item;
