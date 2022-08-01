import { Customer } from "../../../domain/customer/entity/customer";
import { Address } from "../../../domain/customer/value-object/address";
import { InputFindCustomerDto, OutputFindCustomerDto } from "./find.customer.dto";
import { FindCustomerUseCase } from "./find.customer";

const customer = new Customer("123", "John");
const address = new Address("Street", 123, "City", "Zip");
customer.changeAddress(address);

const MockedRepository = () => ({
  find: jest.fn().mockResolvedValue(customer),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
})

describe("Unit Test find customer use case", () => {
  test("Should find a customer", async () => {
    const useCase = new FindCustomerUseCase(MockedRepository());

    const input: InputFindCustomerDto = {
      id: customer.id,
    }

    const expectedOutput: OutputFindCustomerDto = {
      id: customer.id,
      name: customer.name,
      address: {
        city: customer.address.city,
        zip: customer.address.zip,
        street: customer.address.street,
        number: customer.address.number
      },
    };

    const output = await useCase.execute(input);

    expect(output).toEqual(expectedOutput);
  });

  test("Should not find a customer", async () => {
    const repository = MockedRepository();
    repository.find.mockImplementationOnce(() => {
      throw new Error("Customer not found");
    });

    const useCase = new FindCustomerUseCase(repository);

    const input: InputFindCustomerDto = {
      id: "123",
    }

    await expect(() => {
      return useCase.execute(input);
    }).rejects.toThrow("Customer not found");
  });
})
