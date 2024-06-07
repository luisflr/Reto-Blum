import { Customer } from '../domain/Customer';

export interface CustomersRepository {
  findByFilter(customer: Customer): Promise<Customer[]>;
}
