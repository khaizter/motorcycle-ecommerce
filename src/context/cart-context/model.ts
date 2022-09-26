export interface Item {
  id: string;
  imageKey: string;
  imageUrl: string;
  name: string;
  quantity: number;
  price: number;
}

export interface contextType {
  isOpen: boolean;
  showCart: () => void;
  hideCart: () => void;
  cartItems: Array<Item>;
  addToCart: (item: Item) => void;
  removeFromCart: (id: string) => void;
  editItemQuantity: (id: string, newQuantity: number) => void;
  setCart: (items: Array<Item>) => void;
}
