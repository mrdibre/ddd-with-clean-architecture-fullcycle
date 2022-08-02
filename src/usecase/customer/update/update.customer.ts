import { Address } from "../../../domain/customer/value-object/address";
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from "./update.customer.dto";
import { CustomerRepositoryInterface } from "../../../domain/customer/repository/customer-repository-interface";

export class UpdateCustomerUseCase {
  constructor(private readonly repository: CustomerRepositoryInterface) {}

  async execute(input: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto> {
    const customer = await this.repository.find(input.id);

    if (!customer) {
      throw new Error("Customer not found");
    }

    customer.changeName(input.name);
    customer.changeAddress(
      new Address(
          input.address.street,
          input.address.number,
          input.address.city,
          input.address.zip
      )
    );

    await this.repository.update(customer);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        city: customer.address.city,
        zip: customer.address.zip,
      }
    };
  }
}
