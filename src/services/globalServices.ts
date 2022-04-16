import { DealsService } from "./dealsService";
import { InventoryService } from "./inventoryService";

export class GlobalServices {
  private _inventoryService: InventoryService;
  private _dealsService: DealsService;

  constructor() {
    this._inventoryService = new InventoryService();
    this._dealsService = new DealsService();
  }

  get inventoryService(): InventoryService {
    return this._inventoryService;
  }

  get dealsService(): DealsService {
    return this._dealsService;
  }
}
