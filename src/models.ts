export interface InventoryItem {
  id: string;
  price: number;
}

export interface BasketItem {
  item: InventoryItem;
  quantity: number;
}
