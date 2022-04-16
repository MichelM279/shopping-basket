import { Basket } from "./basket";
import { GlobalServices } from "./services";

export class User {
  private _basket: Basket;
  private _services: GlobalServices;

  constructor(services: GlobalServices) {
    this._services = services;
    this._basket = new Basket(services);
  }

  public get basket() {
    return this._basket;
  }
}
