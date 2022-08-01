import { Sequelize } from "sequelize-typescript";
import { CustomerModel } from "../../../infrastructure/customer/model/customer.model";
import { CustomerRepository } from "../../../infrastructure/customer/repository/customer-repository";
import { Customer } from "../../../domain/customer/entity/customer";
import { Address } from "../../../domain/customer/value-object/address";
import { InputFindCustomerDto, OutputFindCustomerDto } from "./find.customer.dto";
import { FindCustomerUseCase } from "./find.customer";

describe("Integration Test find customer use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    });

    sequelize.addModels([CustomerModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close();
  })

  test("Should find a customer", async () => {
    const customer = new Customer("123", "John");
    const address = new Address("Street", 123, "City", "Zip");
    customer.changeAddress(address);

    const costumerRepository = new CustomerRepository();
    await costumerRepository.create(customer);

    const input: InputFindCustomerDto = {
      id: customer.id,
    }

    const useCase = new FindCustomerUseCase(costumerRepository);

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
})
