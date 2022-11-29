export interface OrderType {
  id: string;
  deliveryAddress: string;
  items: Array<ItemType>;
  purchasedDate: string;
  status: string;
  owner: string;
}

export interface ItemType {
  imageKey: string;
  imageUrl: string;
  name: string;
  price: number;
  productId: string;
  quantity: number;
  _id: string;
}
