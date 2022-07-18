import { RepositoryInterface } from "../../@shared/repository/repository-interface";
import { Customer } from "../../customer/entity/customer";

export interface OrderRepositoryInterface extends RepositoryInterface<Customer> {}
