import { CustomerRepository } from "../../../infrastructure/customer/repository/customer-repository";
import { InputListCustomerDto, OutputListCustomerDto } from "./list.customer.dto";

export class ListCustomerUseCase {
  constructor(private customerRepository: CustomerRepository) {}

  async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
    const customersDb = await this.customerRepository.findAll();

    const customers = customersDb.map<OutputListCustomerDto["customers"][number]>((customer) => ({
      id: customer.id,
      name: customer.name,
      address: {
        zip: customer.address.zip,
        city: customer.address.city,
        street: customer.address.street,
        number: customer.address.number,
      },
    }));

    return {
      customers,
    }
  }
}
