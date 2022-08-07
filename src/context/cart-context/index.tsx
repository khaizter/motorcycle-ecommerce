import React, { useState } from 'react';

import { createContext } from 'react';

import { CartValuesType } from './model';

import { Item } from './model';

const defaultProvider: CartValuesType = {
  isOpen: false,
  showCart: () => {},
  hideCart: () => {},
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {}
};

const CartContext = createContext(defaultProvider);

interface propType {
  children: React.ReactNode;
}

const CartProvider: React.FC<propType> = props => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<Array<Item>>([]);

  const showCartHandler = () => setIsOpen(true);
  const hideCartHandler = () => setIsOpen(false);

  const addToCartHandler = (item: Item) => {
    setCartItems(prevItems => {
      return [...prevItems, item];
    });
  };

  const removeFromCartHandler = (id: string) => {
    setCartItems(prevItems => {
      return prevItems.filter(item => item.id !== id);
    });
  };

  return (
    <CartContext.Provider
      value={{
        isOpen: isOpen,
        showCart: showCartHandler,
        hideCart: hideCartHandler,
        cartItems: cartItems,
        addToCart: addToCartHandler,
        removeFromCart: removeFromCartHandler
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
