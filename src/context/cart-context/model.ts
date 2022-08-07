export interface Item {
  id: string;
  thumbnail: string;
  name: string;
  quantity: number;
  price: number;
}

export interface CartValuesType {
  isOpen: boolean;
  showCart: () => void;
  hideCart: () => void;
  cartItems: Array<Item>;
  addToCart: (item: Item) => void;
  removeFromCart: (id: string) => void;
}
