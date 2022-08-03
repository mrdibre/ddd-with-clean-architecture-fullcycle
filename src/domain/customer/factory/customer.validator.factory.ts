import { Customer } from "../entity/customer";
import { CustomerValidator } from "../validator/customer.validator";
import { ValidatorInterface } from "../../validator/validator.interface";

export class CustomerValidatorFactory {
  static create(): ValidatorInterface<Customer> {
    return new CustomerValidator();
  }
}
