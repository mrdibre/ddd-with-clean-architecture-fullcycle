import { Customer } from "./customer";
import { Address } from "../../@shared/value-object/address";

describe("Customer unit tests", () => {
  it("Should throw error when id is empty", () => {
    expect(() => {
      const customer = new Customer("", "John");
    }).toThrowError("Id is required");
  })

  it("Should throw error when name is empty", () => {
    expect(() => {
      const customer = new Customer("124", "");
    }).toThrowError("Name is required");
  })

  it("Should change name", () => {
    const customer = new Customer("124", "John");
    customer.changeName("Jane");

    expect(customer.name).toBe("Jane");
  })

  it("Should activate customer", () => {
    const customer = new Customer("124", "John");
    customer.changeAddress(new Address("Street", 123, "City", "State"));
    customer.activate();

    expect(customer.isActive()).toBe(true);
  })

  it("Should deactivate customer", () => {
    const customer = new Customer("124", "John");
    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  })

  it("Should throw error when address is undefined when you activate a customer", () => {
    expect(() => {
      const customer = new Customer("124", "John");
      customer.activate();
    }).toThrowError("Address is mandatory to activate a customer");
  })

  it("should add reward points", () => {
    const customer = new Customer("124", "John");
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(100);
    expect(customer.rewardPoints).toBe(100);

    customer.addRewardPoints(100);
    expect(customer.rewardPoints).toBe(200);
  })
})
