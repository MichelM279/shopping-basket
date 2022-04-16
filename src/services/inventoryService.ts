import { InventoryItem } from "../models";

const dummyItem1: InventoryItem = { id: "A0001", price: 12.99 };
const dummyItem2: InventoryItem = { id: "A0002", price: 3.99 };

const INVENTORY = new Set<InventoryItem>([dummyItem1, dummyItem2]);

export class InventoryService {
  private _inventory: Set<InventoryItem>;
  constructor() {
    this._inventory = INVENTORY;
  }

  getInventoryItemWithId(productId: string): InventoryItem | undefined {
    return [...this._inventory].find((i) => i.id === productId);
  }
}
