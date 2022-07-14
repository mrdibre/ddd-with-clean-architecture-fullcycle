import { Product } from "./product";

describe("Product Unit tests", () => {
  it("Should throw error when id is empty", () => {
    expect(() => {
      const product = new Product("", "Product 1", 100);
    }).toThrowError("Id is required");
  })

  it("Should throw error when name is empty", () => {
    expect(() => {
      const product = new Product("1", "", 100);
    }).toThrowError("Name is required");
  })

  it("Should throw error when name is less than zero", () => {
    expect(() => {
      const product = new Product("1", "12", -1);
    }).toThrowError("Price must be greater than zero");
  })

  it("Should change name", () => {
    const product = new Product("1", "Product 1", 100);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  })

  it("Should change price", () => {
    const product = new Product("1", "Product 1", 100);
    product.changePrice(30);
    expect(product.price).toBe(30);
  })
})
