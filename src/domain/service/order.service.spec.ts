import { Order } from "../entity/order";
import { OrderItem } from "../entity/order-item";
import { OrderService } from "./order-service";
import { Customer } from "../entity/customer";

describe("Order service unit tests", () => {
  it("should place an order", () => {
    const customer = new Customer("1", "John Doe");
    const orderItem = new OrderItem("1", "Product 1", 100,"10", 2);

    const order = OrderService.placeOrder(customer, [orderItem]);

    expect(customer.rewardPoints).toBe(100);
    expect(order.total()).toBe(200);
  })

  it("should return sum of all orders", () => {
    const orderItem1 = new OrderItem("i1", "Item 1", 100, "p1", 1);
    const orderItem2 = new OrderItem("i2", "Item 2", 200, "p2", 2);
    const orderItem3 = new OrderItem("i3", "Item 3", 300, "p3", 3);

    const order1 = new Order("1", "pizza", [orderItem1]);
    const order2 = new Order("2", "pizza", [orderItem2, orderItem3]);

    const orders = [order1, order2];

    const sum = OrderService.getSumOfOrders(orders);

    expect(sum).toBe(1400);
  })
})
