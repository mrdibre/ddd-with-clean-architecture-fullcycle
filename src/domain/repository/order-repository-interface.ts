import { RepositoryInterface } from "./repository-interface";
import { Customer } from "../entity/customer";

export interface OrderRepositoryInterface extends RepositoryInterface<Customer> {}
