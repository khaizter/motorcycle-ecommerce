import React, { useState } from 'react';

import { createContext } from 'react';

import { CartValuesType } from './model';

import { Item } from './model';

const DUMMY_CART_ITEMS: Array<Item> = [
  {
    id: '199971',
    thumbnail: '/assets/images/product-placeholder_0.jpg',
    name: 'Product 1',
    quantity: 1,
    price: 19.99
  },
  {
    id: '199972',
    thumbnail: '/assets/images/product-placeholder_1.jpg',
    name: 'Product 2',
    quantity: 2,
    price: 15.99
  },
  {
    id: '199973',
    thumbnail: '/assets/images/product-placeholder_2.jpg',
    name: 'Product 3',
    quantity: 3,
    price: 11.99
  }
];

const defaultProvider: CartValuesType = {
  isOpen: false,
  showCart: () => {},
  hideCart: () => {},
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  editItemQuantity: () => {}
};

const CartContext = createContext(defaultProvider);

interface propType {
  children: React.ReactNode;
}

const CartProvider: React.FC<propType> = props => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<Array<Item>>(DUMMY_CART_ITEMS);

  const showCartHandler = () => setIsOpen(true);
  const hideCartHandler = () => setIsOpen(false);

  const addToCartHandler = (item: Item) => {
    setCartItems(prevItems => {
      const newItems = [...prevItems];
      const existingItem = newItems.find(i => i.id === item.id);
      if (!existingItem) return [...newItems, item];
      existingItem.quantity += 1;
      return newItems;
    });
  };

  const removeFromCartHandler = (id: string) => {
    setCartItems(prevItems => {
      return prevItems.filter(item => item.id !== id);
    });
  };

  const editItemQuantityHandler = (id: string, newQuantity: number) => {
    setCartItems(prevItems => {
      const itemsCopy = [...prevItems];
      const selectedItem = itemsCopy.find(item => item.id === id);
      if (!selectedItem) return itemsCopy;
      selectedItem.quantity = newQuantity;
      return itemsCopy;
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
        removeFromCart: removeFromCartHandler,
        editItemQuantity: editItemQuantityHandler
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
