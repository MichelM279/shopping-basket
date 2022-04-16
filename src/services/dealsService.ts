import { BasketItem } from "../models";

interface BuyXGetYConditions {
  x: number;
  y: number;
}

export class DealsService {
  private _itemDiscountMap: Map<string, number> = new Map<string, number>();
  private _itemBuyXGetYConditionsMap: Map<string, BuyXGetYConditions> = new Map<
    string,
    BuyXGetYConditions
  >();

  constructor() {}

  adjustPrice(basketItem: BasketItem): number {
    const billibleQuantity: number = this._calcBillableQuantity(basketItem);
    let billiblePrice: number = this._calcPrice(basketItem);
    return billiblePrice * billibleQuantity;
  }

  addItemDiscount(itemId: string, discountInPercent: number): void {
    this._itemDiscountMap.set(itemId, discountInPercent);
  }

  removeItemDiscount(itemId: string): void {
    this._itemDiscountMap.delete(itemId);
  }

  editBuyXGetYFreeDeal(itemId: string, x: number, y: number): void {
    const newConditions: BuyXGetYConditions = {
      x,
      y,
    };
    this._itemBuyXGetYConditionsMap.set(itemId, newConditions);
  }

  removeBuyXGetYFreeDeal(itemId: string): void {
    this._itemBuyXGetYConditionsMap.delete(itemId);
  }

  private _calcPrice(basketItem: BasketItem): number {
    if (this._itemDiscountMap.has(basketItem.item.id)) {
      const discountedPrice =
        (basketItem.item.price *
          (100 - this._itemDiscountMap.get(basketItem.item.id)!)) /
        100;
      return Math.round(discountedPrice * 100) / 100;
    }
    return basketItem.item.price;
  }

  private _calcBillableQuantity(basketItem: BasketItem): number {
    const conditions: BuyXGetYConditions | undefined =
      this._itemBuyXGetYConditionsMap.get(basketItem.item.id);
    if (conditions) {
      const fullXYPackSize = conditions.x + conditions.y;
      const nFullPacks = Math.floor(basketItem.quantity / fullXYPackSize);
      const remainder = basketItem.quantity % fullXYPackSize;
      return nFullPacks * conditions.x + remainder;
    } else {
      return basketItem.quantity;
    }
  }
}
