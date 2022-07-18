import { CustomerFactory } from "./customer.factory";
import { Address } from "../value-object/address";

describe("Customer factory unit test", () => {
  it("Should create a customer", () => {
    const customer = CustomerFactory.create("John");

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John");
    expect(customer.address).toBeUndefined();
  })

  it("Should create a customer with address", () => {
    const customer = CustomerFactory.createWithAddress("John", {
      street: "Street",
      number: 1,
      zip: "12345",
      city: "City"
    });

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John");
    expect(customer.address).toEqual(
        new Address("Street", 1, "City", "12345")
    );
  })
});
