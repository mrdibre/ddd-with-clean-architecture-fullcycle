import { InputFindCustomerDto, OutputFindCustomerDto } from "./find.customer.dto";
import { CustomerRepositoryInterface } from "../../../domain/customer/repository/customer-repository-interface";

export class FindCustomerUseCase {
  constructor(private readonly repository: CustomerRepositoryInterface) {}

  async execute(input: InputFindCustomerDto): Promise<OutputFindCustomerDto> {
    const response = await this.repository.find(input.id);

    return {
      id: response.id,
      name: response.name,
      address: {
        city: response.address.city,
        zip: response.address.zip,
        street: response.address.street,
        number: response.address.number
      }
    }
  }
}
