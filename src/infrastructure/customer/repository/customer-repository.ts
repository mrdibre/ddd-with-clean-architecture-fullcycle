import { Customer } from "../../../domain/customer/entity/customer";
import { CustomerRepositoryInterface } from "../../../domain/customer/repository/customer-repository-interface";
import { CustomerModel } from "../model/customer.model";
import { Address } from "../../../domain/customer/value-object/address";

export class CustomerRepository implements CustomerRepositoryInterface {
  private static createCustomerFromModel(model: CustomerModel): Customer {
    const customer = new Customer(model.id, model.name);
    customer.changeAddress(
      new Address(
        model.street,
        model.number,
        model.city,
        model.zip,
      )
    )

    if (model.active) {
      customer.activate();
    }

    return customer;
  }

  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      zip: entity.address.zip,
      city: entity.address.city,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints
    })
  }

  async find(id: string): Promise<Customer> {
    let model;

    try {
      model = await CustomerModel.findOne({ where: { id }, rejectOnEmpty: true });
    } catch (e) {
      throw new Error("Customer not found");
    }

    return CustomerRepository.createCustomerFromModel(model);
  }

  async findAll(): Promise<Customer[]> {
    const models = await CustomerModel.findAll()

    return models.map(CustomerRepository.createCustomerFromModel)
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update({
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      zip: entity.address.zip,
      city: entity.address.city,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints
    }, {  where: { id: entity.id } })
  }
}
