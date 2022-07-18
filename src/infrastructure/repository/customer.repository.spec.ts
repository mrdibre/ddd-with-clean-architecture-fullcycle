import { Sequelize } from "sequelize-typescript";
import { CustomerRepository } from "./customer-repository";
import { Customer } from "../../domain/entity/customer";
import { Address } from "../../domain/entity/address";
import { CustomerModel } from "../db/sequelize/model/customer.model";

describe('Customer Repository Test', () => {
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

  it('should create a customer', async () => {
    const customerRepository = new CustomerRepository();

    const address = new Address('Street', 1, '12345', 'City')
    const customer = new Customer('1', 'John Doe');
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: '1' } })

    expect(customerModel.toJSON()).toStrictEqual({
      id: '1',
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zip: address.zip,
      city: address.city
    });
  })

  it('should update a customer', async () => {
    const customerRepository = new CustomerRepository();

    const address = new Address('Street', 1, '12345', 'City')
    const customer = new Customer('1', 'John Doe');
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: '1' } })

    expect(customerModel.toJSON()).toStrictEqual({
      id: '1',
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zip: address.zip,
      city: address.city
    });

    const newAddress = new Address('Street Updated', 2, 'City Updated', 'City_')

    customer.changeName('John Doe Updated');
    customer.changeAddress(newAddress);

    await customerRepository.update(customer);

    const customerModelUpdated = await CustomerModel.findOne({ where: { id: '1' } })

    expect(customerModelUpdated.toJSON()).toStrictEqual({
      id: '1',
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: newAddress.street,
      number: newAddress.number,
      zip: newAddress.zip,
      city: newAddress.city
    });
  })

  it('should find a customer', async () => {
    const customerRepository = new CustomerRepository();

    const address = new Address('Street', 1, '12345', 'City')
    const customer = new Customer('1', 'John Doe');
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const customerFound = await customerRepository.find('1');

    expect(customerFound).toEqual(customer);
  })

  it('should find all customer', async () => {
    const customerRepository = new CustomerRepository();

    const address = new Address('Street', 1, '12345', 'City')
    const customer = new Customer('1', 'John Doe');
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const address2 = new Address('Street2', 12, '122345', 'City2')
    const customer2 = new Customer('2', 'John Doe2');
    customer2.changeAddress(address2);
    await customerRepository.create(customer2);

    const customers = [customer, customer2]

    const customerFound = await customerRepository.findAll();

    expect(customerFound).toEqual(customers);
  })
})
