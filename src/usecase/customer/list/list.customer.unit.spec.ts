import { CustomerFactory } from "../../../domain/customer/factory/customer.factory";
import { ListCustomerUseCase } from "./list.customer";

const customer1 = CustomerFactory.createWithAddress("John", { street: "123 Main St", city: "Anytown", number: 1000, zip: "12345" });
const customer2 = CustomerFactory.createWithAddress("Jane", { street: "456 Main St", city: "Town", number: 300, zip: "6789" });
const customer3 = CustomerFactory.createWithAddress("Doe", { street: "789 Main St", city: "Any", number: 458, zip: "2358" });

const MockedRepository = () => ({
  create: jest.fn(),
  update: jest.fn(),
  find: jest.fn(),
  findAll: jest.fn().mockResolvedValueOnce([customer1, customer2, customer3]),
})

describe("Unit test List Customer User Case", () => {
  it("Should list customers", async () => {
    const repository = MockedRepository();

    const useCase = new ListCustomerUseCase(repository);

    const output = await useCase.execute({});

    expect(output.customers.length).toBe(3);

    expect(output.customers[0].name).toBe("John");
    expect(output.customers[0].address.street).toBe("123 Main St");
    expect(output.customers[0].address.city).toBe("Anytown");
    expect(output.customers[0].address.number).toBe(1000);
    expect(output.customers[0].address.zip).toBe("12345");

    expect(output.customers[1].name).toBe("Jane");
    expect(output.customers[1].address.street).toBe("456 Main St");
    expect(output.customers[1].address.city).toBe("Town");
    expect(output.customers[1].address.number).toBe(300);
    expect(output.customers[1].address.zip).toBe("6789");

    expect(output.customers[2].name).toBe("Doe");
    expect(output.customers[2].address.street).toBe("789 Main St");
    expect(output.customers[2].address.city).toBe("Any");
    expect(output.customers[2].address.number).toBe(458);
    expect(output.customers[2].address.zip).toBe("2358");
  });
});
