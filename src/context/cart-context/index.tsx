import React, { useState, createContext, useEffect, useContext } from 'react';

import { Item, contextType } from './model';

// Api calls
import CartApi from 'src/common/api/cart';
import { AuthContext } from 'src/context/auth-context';

import { useSnackbar } from 'notistack';

const defaultProvider: contextType = {
  isOpen: false,
  showCart: () => {},
  hideCart: () => {},
  cartItems: [],
  addToCart: (item: Item) => {},
  removeFromCart: (id: string) => {},
  editItemQuantity: (id: string, newQuantity: number) => {},
  setCart: (items: Array<Item>) => {},
  emptyCart: () => {}
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
  const { enqueueSnackbar } = useSnackbar();

  const showCartHandler = () => setIsOpen(true);
  const hideCartHandler = () => setIsOpen(false);

  useEffect(() => {
    if (!currentToken) return;
    CartApi.getCart(currentToken)
      .then(response => {
        const transformedItems = response.data.cart.items.map((item: any) => {
          return {
            id: item.productId,
            imageKey: item.imageKey,
            imageUrl: item.imageUrl,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            availableStocks: item.availableStocks
          };
        });
        setCartItems(transformedItems);
      })
      .catch(err => {
        enqueueSnackbar(err?.response?.data?.message || err.message, { variant: 'error' });
      });
  }, [currentToken, isOpen]);

  useEffect(() => {
    if (!currentToken) return;
    if (initialRender) {
      initialRender = false;
      return;
    }
    CartApi.updateCart(currentToken, cartItems)
      .then(response => {
        console.log('Cart synced.');
      })
      .catch(err => {
        console.log(err);
        enqueueSnackbar(err?.response?.data?.message || err.message, { variant: 'error' });
      });
  }, [cartItems, currentToken, enqueueSnackbar]);

  const addToCartHandler = (item: Item) => {
    setCartItems(prevItems => {
      const newItems = [...prevItems];
      const existingItem = newItems.find(i => i.id === item.id);
      if (!existingItem) return [...newItems, item];
      // if quantity is within the availableStocks limit
      if (existingItem.availableStocks && existingItem.quantity >= existingItem.availableStocks) {
        return prevItems;
      }
      existingItem.quantity += 1;
      enqueueSnackbar('Item added to cart', { variant: 'info' });
      return newItems;
    });
  };

  const removeFromCartHandler = (id: string) => {
    setCartItems(prevItems => {
      return prevItems.filter(item => item.id !== id);
    });
    enqueueSnackbar('Item removed from cart', { variant: 'info' });
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

  const emptyCartHandler = () => {
    setCartItems([]);
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
        setCart: setCartHandler,
        emptyCart: emptyCartHandler
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
