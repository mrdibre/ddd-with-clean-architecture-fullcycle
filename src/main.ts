import { Customer } from "./domain/customer/entity/customer";
import { Address } from "./domain/customer/value-object/address";

const customer = new Customer('123', 'John');
const address = new Address('Main Street', 123, 'New York', '12345');
customer.changeAddress(address);
