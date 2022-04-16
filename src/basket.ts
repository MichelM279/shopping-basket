import { BasketItem, InventoryItem } from "./models";
import { GlobalServices } from "./services/index";

export class Basket {
  private _services: GlobalServices;
  private _loadedItems: BasketItem[] = [];
  constructor(services: GlobalServices) {
    this._services = services;
  }

  scan(item: string): void {
    const inv_item: InventoryItem | undefined =
      this._services.inventoryService.getInventoryItemWithId(item);

    if (!inv_item) {
      console.error("Item not available!");
      return;
    }

    const foundItem: BasketItem | undefined = this._loadedItems.find(
      (bi) => bi.item.id === item
    );

    if (foundItem) {
      foundItem.quantity += 1;
    } else {
      this._loadedItems.push({ item: inv_item, quantity: 1 });
    }
  }

  total(): number {
    return this._loadedItems
      .map((i) => this._services.dealsService.adjustPrice(i))
      .reduce((sum, current) => sum + current);
  }
}
