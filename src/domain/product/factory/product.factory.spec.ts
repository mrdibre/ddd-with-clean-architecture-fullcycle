import { ProductFactory } from "./product.factory";
import { Product } from "../entity/product";

describe("Product Factory Test", () => {
  it("Should create a product type A", () => {
    const product = ProductFactory.create("a", "Product A", 100);

    expect(product.id).toBeDefined()
    expect(product.name).toBe("Product A")
    expect(product.price).toBe(100)
    expect(product.constructor.name).toBe("Product")
  })

  it("Should create a product type B", () => {
    const product = ProductFactory.create("b", "Product B", 100);

    expect(product.id).toBeDefined()
    expect(product.name).toBe("Product B")
    expect(product.price).toBe(200)
    expect(product.constructor.name).toBe("ProductB")
  })

  it("Should throw error when invalid type", () => {
    expect(() => {
      const product = ProductFactory.create("c", "Product B", 100);
    }).toThrowError("Invalid product type")
  })
})
