import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create.customer.dto";
import { CustomerRepositoryInterface } from "../../../domain/customer/repository/customer-repository-interface";
import { CustomerFactory } from "../../../domain/customer/factory/customer.factory";

export class CreateCustomerUseCase {
  constructor(private readonly repository: CustomerRepositoryInterface) {}

  async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
    const customer = CustomerFactory.createWithAddress(input.name, input.address);

    await this.repository.create(customer);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        city: customer.address.city,
        number: customer.address.number,
        zip: customer.address.zip,
      },
    }
  }
}
