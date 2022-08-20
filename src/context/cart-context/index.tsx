import React, { useState, createContext, useEffect, useContext } from 'react';

import { Item, contextType } from './model';

// Api calls
import CartApi from 'src/common/api/cart';
import { AuthContext } from 'src/context/auth-context';

const defaultProvider: contextType = {
  isOpen: false,
  showCart: () => {},
  hideCart: () => {},
  cartItems: [],
  addToCart: (item: Item) => {},
  removeFromCart: (id: string) => {},
  editItemQuantity: (id: string, newQuantity: number) => {},
  setCart: (items: Array<Item>) => {}
};

const CartContext = createContext(defaultProvider);

interface propType {
  children: React.ReactNode;
}

let initialRender = true;

const CartProvider: React.FC<propType> = props => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<Array<Item>>([]);
  const { currentToken } = useContext(AuthContext);

  const showCartHandler = () => setIsOpen(true);
  const hideCartHandler = () => setIsOpen(false);

  useEffect(() => {
    if (!currentToken) return;
    if (initialRender) {
      initialRender = false;
      return;
    }
    CartApi.updateCart(currentToken, cartItems)
      .then(response => {
        console.log('cart synced.');
      })
      .catch(err => {
        console.log(err);
      });
  }, [cartItems]);

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

  const setCartHandler = (items: Array<Item>) => {
    setCartItems(items);
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
        editItemQuantity: editItemQuantityHandler,
        setCart: setCartHandler
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
