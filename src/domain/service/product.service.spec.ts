import { Product } from "../entity/product";
import { ProductService } from "./product.service";

describe("Product service unit tests", () => {
  it("Should change the prices of all products", () => {
    const p1 = new Product("1", "p1", 10);
    const p2 = new Product("2", "p2", 20);
    const p3 = new Product("3", "p3", 30);
    const products = [p1, p2, p3];

    ProductService.increasePrices(products, 100);

    expect(p1.price).toBe(20);
    expect(p2.price).toBe(40);
    expect(p3.price).toBe(60);
  })
})
