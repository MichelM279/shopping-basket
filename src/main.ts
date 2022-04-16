import { GlobalServices } from "./services";
import { User } from "./user";

const globalServices = new GlobalServices();

console.log("Showcase 1: Scanning an item and displaying the bucket total");
const dummyUser1 = new User(globalServices);
dummyUser1.basket.scan("A0001");
let total = dummyUser1.basket.total();
console.log(`Total Basket value is ${total}`);
console.log("Expected total of 12.99\n");

console.log("Showcase 2: Buy 1, get 1 free deal");
const dummyUser2 = new User(globalServices);
dummyUser2.basket.scan("A0002");
dummyUser2.basket.scan("A0001");
dummyUser2.basket.scan("A0002");
globalServices.dealsService.editBuyXGetYFreeDeal("A0002", 1, 1);
total = dummyUser2.basket.total();
console.log(`Total Basket value is ${total}`);
console.log("Expected total of 16.98\n");
globalServices.dealsService.removeBuyXGetYFreeDeal("A0002");

console.log("Showcase 3: 10% off an article deal");
const dummyUser3 = new User(globalServices);
dummyUser3.basket.scan("A0002");
dummyUser3.basket.scan("A0001");
dummyUser3.basket.scan("A0002");
globalServices.dealsService.addItemDiscount("A0001", 10);
total = dummyUser3.basket.total();
console.log(`Total Basket value is ${total}`);
console.log("Expected total of 19.67\n");
globalServices.dealsService.removeItemDiscount("A0001");
