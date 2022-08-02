import { CustomerFactory } from "../../../domain/customer/factory/customer.factory";
import { InputUpdateCustomerDto } from "./update.customer.dto";
import { UpdateCustomerUseCase } from "./update.customer";

const customer = CustomerFactory.createWithAddress("John", { street: "123 Main St", city: "Anytown", number: 1000, zip: "12345" });

const input: InputUpdateCustomerDto = {
  id: customer.id,
  name: "John Updated",
  address: {
    street: `${customer.address.street} Updated`,
    city: `${customer.address.city} Updated`,
    number: customer.address.number + 2,
    zip: `${customer.address.zip} Updated`,
  },
};

const MockedRepository = () => ({
  create: jest.fn(),
  update: jest.fn(),
  findAll: jest.fn(),
  find: jest.fn().mockResolvedValue(customer),
})

describe("Unit Tests Customer Use Case", () => {
  test("should update customer", async () => {
    const repository = MockedRepository();

    const useCase = new UpdateCustomerUseCase(repository);

    const output = await useCase.execute(input);

    expect(output).toEqual(input);
  });

  test("should throw error when customer not found", async () => {
    const repository = MockedRepository();
    repository.find.mockResolvedValueOnce(null);

    const useCase = new UpdateCustomerUseCase(repository);

    await expect(() => useCase.execute(input)).rejects.toThrow("Customer not found");
  })
})
