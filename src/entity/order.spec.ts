import { Order } from "./order";
import { OrderItem } from "./order-item";

describe("Order unit tests", () => {
  it("Should throw error when id is empty", () => {
    expect(() => {
      const order = new Order("", "12", []);
    }).toThrowError("Id is required");
  })

  it("Should throw error when customerId is empty", () => {
    expect(() => {
      const order = new Order("1", "", []);
    }).toThrowError("CustomerId is required");
  })

  it("Should throw error when items are empty", () => {
    expect(() => {
      const order = new Order("1", "1", []);
    }).toThrowError("Items qtd must be greater than 0");
  })

  it("Should calculate total", () => {
    const orderItem1 = new OrderItem("1", "1", 10, "p1", 1);
    const orderItem2 = new OrderItem("2", "1", 20, "p2", 2);

    const order = new Order("1", "1", [orderItem1, orderItem2]);
    expect(order.total()).toBe(50);
  })

  it("Should check if the qtd is greater than 0", () => {
    expect(() => {
      const orderItem1 = new OrderItem("1", "1", 10, "p1", 0);
      const order = new Order("1", "1", [orderItem1]);
    }).toThrowError("Quantity must be greater than 0");
  })
})
