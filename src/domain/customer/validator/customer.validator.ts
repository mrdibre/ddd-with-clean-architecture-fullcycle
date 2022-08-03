import * as yup from "yup";
import { Customer } from "../entity/customer";
import { ValidatorInterface } from "../../validator/validator.interface";

export class CustomerValidator implements ValidatorInterface<Customer> {
  validate(customer: Customer): void {
    try {
      const schema = yup.object().shape({
        id: yup.string().required("Id is required"),
        name: yup.string().required("Name is required"),
      });

      schema.validateSync(
          { id: customer.id, name: customer.name },
          { abortEarly: false }
      );
    } catch (e) {
      const errors = e as yup.ValidationError;

      errors.errors.forEach(err => {
        customer.notification.addError({ message: err, context: "customer" });
      });
    }
  }
}
