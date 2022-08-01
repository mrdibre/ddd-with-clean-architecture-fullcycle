import { InputCreateCustomerDto } from "./create.customer.dto";
import { OutputFindCustomerDto } from "../find/find.customer.dto";
import { CreateCustomerUseCase } from "./create.customer";

const input: InputCreateCustomerDto = {
  name: "John",
  address: {
    street: "123 Main St",
    city: "Anytown",
    number: 123,
    zip: "zip",
  },
}

const MockedRepository = () => ({
  find: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
})

describe("Unit Test Create Customer", () => {
  test("should create customer", async () => {
    const repository = MockedRepository()
    const useCase = new CreateCustomerUseCase(repository)

    const output = await useCase.execute(input)

    const expectedOutput = {
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        city: input.address.city,
        number: input.address.number,
        zip: input.address.zip,
      },
    };

    expect(output).toEqual(expectedOutput)
  });

  test("should throw an error when name is missing", async () => {
    const repository = MockedRepository()
    const useCase = new CreateCustomerUseCase(repository)

    await expect(() => {
      return useCase.execute({
        ...input,
        name: "",
      })
    }).rejects.toThrow("Name is required")
  });

  test("should throw an error when street is missing", async () => {
    const repository = MockedRepository()
    const useCase = new CreateCustomerUseCase(repository)

    await expect(() => {
      return useCase.execute({
        ...input,
        address: {
          ...input.address,
          street: "",
        },
      })
    }).rejects.toThrow("Street is required")
  });
})
