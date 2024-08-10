

import { createContext, useContext, useState } from "react";
import { getImageUrl } from "../../services/firebase"; 

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const isInCart = (id) => {
        return cart.some(prod => prod.id === id);
    };

    const addItem = async (productoToAdd) => {
        let imgUrl = productoToAdd.img; 

        if (imgUrl && imgUrl.includes('firebase')) { 
            imgUrl = await getImageUrl(imgUrl);
        }

        const productWithImg = { ...productoToAdd, img: imgUrl };

        if (isInCart(productoToAdd.id)) {
            setCart(prev => prev.map(prod => 
                prod.id === productWithImg.id 
                    ? { ...prod, quantity: prod.quantity + productWithImg.quantity }
                    : prod
            ));
        } else {
            setCart(prev => [...prev, productWithImg]);
        }
    };

    const removeItem = (id) => {
        const cartUpdated = cart.filter((prod) => prod.id !== id);
        setCart(cartUpdated);
    };

    const clearCart = () => {
        setCart([]);
    };

    const getTotalQuantity = () => {
        let accu = 0;
        cart.forEach(prod => {
            accu += prod.quantity;
        });
        return accu;
    };

    const getTotal = () => {
        let accu = 0;
        cart.forEach(prod => {
            accu += prod.price * prod.quantity;
        });
        return accu;
    };

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity <= 0) {
            removeItem(id);
        } else {
            setCart((prev) =>
                prev.map((prod) =>
                    prod.id === id
                        ? { ...prod, quantity: newQuantity }
                        : prod
                )
            );
        }
    };

    const totalQuantity = getTotalQuantity();

    const obj = {
        cart,
        isInCart,
        addItem,
        totalQuantity,
        getTotal,
        removeItem,
        clearCart,
        getTotalQuantity,
        updateQuantity,
    };

    return (
        <CartContext.Provider value={obj}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};
